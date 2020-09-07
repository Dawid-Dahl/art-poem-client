import {takeEvery, call, put} from "redux-saga/effects";
import {apiService} from "../api/apiService";
import {
	getPoemsFulfilled,
	uploadPoem,
	getPoem,
	getPoemFailed,
	editPoem,
	deletePoem,
	deletePoemFulfilled,
	getPoemsFailed,
	getPoemsByUserId,
	getPoemsByUserIdFulfilled,
	getPoemsByUserIdFailed,
	getPoems,
	editPoemFulfilled,
	getPoemFulfilled,
} from "../actions/asyncPoemActions";
import {parseMainApiResponse, convertToBytes, forwardTo} from "../utils/utils";
import {ReduxArtPoem, EditPoemFields} from "../types/types";
import {showFlash} from "../actions/flashActions";
import {startLoading, completeLoading} from "../actions/loadingActions";
import {hidePopup} from "../actions/popupActions";
import history from "../history";
import {deselectCollection} from "../actions/collectionActions";
import {
	renderSocialFeed,
	selectPoem,
	renderPoemsFulfilled,
	renderPoems,
} from "../actions/syncPoemAction";
import {poemNotFound, welcomePoem} from "../utils/defaultPoems";

export function* workerGetPoem({artPoemId}: ReturnType<typeof getPoem>) {
	try {
		yield put(startLoading());

		const res = yield call(apiService.refreshAndFetch, `artpoem/get-artpoem?id=${artPoemId}`);

		if (res.ok) {
			const {payload} = yield call([res, "json"]);

			const artPoem: ReduxArtPoem = JSON.parse(payload);

			yield put(completeLoading());
			yield put(getPoemFulfilled(new Array(artPoem)));
		} else {
			const {payload} = yield call([res, "json"]);

			yield put(completeLoading());
			yield put(selectPoem(poemNotFound));
			yield put(renderPoems(new Array(poemNotFound)));

			yield showFlash(JSON.parse(payload).message);

			yield put(getPoemFailed());
		}
	} catch (e) {
		console.log(e);
	}
}

function* workerGetPoems({poemCount}: ReturnType<typeof getPoems>) {
	try {
		yield put(startLoading());
		yield put(deselectCollection());

		const res = yield call(
			apiService.refreshAndFetch,
			`artpoem/get-artpoems?poemCount=${poemCount}`
		);

		const json = yield call([res, "json"]);

		const artPoems: ReduxArtPoem[] = parseMainApiResponse(json);

		yield put(completeLoading());
		yield put(getPoemsFulfilled(artPoems));

		if (artPoems.length !== 0) {
			yield put(renderSocialFeed(artPoems));
		}
	} catch (e) {
		console.log(e);
		yield put(getPoemsFailed(new Error("Something went wrong while getting the ArtPoems!")));
	}
}

function* workergetPoemsByUserId({id, poemCount}: ReturnType<typeof getPoemsByUserId>) {
	try {
		yield put(startLoading());
		yield put(deselectCollection());

		const res = yield call(
			apiService.refreshAndFetch,
			`artpoem/user-id?id=${id}&poemCount=${poemCount}`
		);

		const json = yield call([res, "json"]);

		const artPoemsFilteredById: ReduxArtPoem[] = parseMainApiResponse(json);

		yield put(completeLoading());

		if (artPoemsFilteredById.length !== 0) {
			yield put(getPoemsByUserIdFulfilled(artPoemsFilteredById));
			yield put(renderPoemsFulfilled(artPoemsFilteredById));
		} else {
			yield put(getPoemsByUserIdFulfilled(new Array(welcomePoem)));
			yield put(renderPoemsFulfilled(new Array(welcomePoem)));
		}
	} catch (e) {
		console.log(e);
		yield put(
			getPoemsByUserIdFailed(new Error("Something went wrong while getting the ArtPoems!"))
		);
	}
}

function* workerUploadPoems({payload}: ReturnType<typeof uploadPoem>) {
	const image = payload.get("imageFile") as File;

	try {
		const bytes = convertToBytes("5 mb");

		if (!bytes) return;

		if (image.size >= bytes) {
			yield put(showFlash("Please choose an image smaller than 5 MB in size"));
			return;
		}

		const res = yield call(apiService.refreshAndFetch, "artpoem/upload", {
			method: "POST",
			body: payload,
		});

		const data = yield call([res, "json"]);

		yield put(showFlash(JSON.parse(data.payload).message));
		yield call(forwardTo, history, `/fullscreen?id=${JSON.parse(data.payload).id}`);
	} catch (e) {
		console.log(e);
	}
}

function* workerEditPoems({payload}: ReturnType<typeof editPoem>) {
	const image = payload.get("editImageFile") as File;
	const poemFields = JSON.parse(payload.get("editPoemFields") as string) as EditPoemFields;

	try {
		if (image) {
			const bytes = convertToBytes("5 mb");

			if (!bytes) return;

			if (image.size >= bytes) {
				yield put(showFlash("Please choose an image smaller than 5 MB in size"));
				return;
			}
		}

		const res = yield call(apiService.refreshAndFetch, "artpoem/edit-artpoem", {
			method: "PUT",
			body: payload,
		});

		const data = yield call([res, "json"]);

		yield put(getPoem(poemFields.poemId));
		yield put(showFlash(JSON.parse(data.payload).message));
		yield put(editPoemFulfilled());
	} catch (e) {
		console.log(e);
	}
}

function* workerDeletePoem({artPoemId}: ReturnType<typeof deletePoem>) {
	try {
		const res = yield call(apiService.refreshAndFetch, "artpoem/delete-artpoem", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({artPoemId}),
		});

		const data = yield call([res, "json"]);

		if (data.success) {
			yield put(showFlash(JSON.parse(data.payload).message));
			yield put(hidePopup());
			yield put(deletePoemFulfilled(artPoemId));
			yield call(forwardTo, history, "/");
		}
	} catch (e) {
		console.log(e);
	}
}

function* asyncPoemsSaga() {
	yield takeEvery("GET_POEM", workerGetPoem);
	yield takeEvery("GET_POEMS", workerGetPoems);
	yield takeEvery("GET_POEMS_BY_USER_ID", workergetPoemsByUserId);
	yield takeEvery("UPLOAD_POEM", workerUploadPoems);
	yield takeEvery("EDIT_POEM", workerEditPoems);
	yield takeEvery("DELETE_POEM", workerDeletePoem);
}

export default asyncPoemsSaga;
