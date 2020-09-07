import {takeEvery, call, put} from "redux-saga/effects";
import {apiService} from "../api/apiService";
import {parseMainApiResponse} from "../utils/utils";
import {ReduxCollection} from "../types/types";
import {
	getAllCollectionsFulfilled,
	addCollection,
	addCollectionFulfilled,
	deleteCollection,
	getAllCollections,
} from "../actions/collectionActions";
import {hidePopup} from "../actions/popupActions";
import {showFlash} from "../actions/flashActions";
import {removePoemsFromCache} from "../actions/asyncPoemActions";
import {removePoemsFromRenderedPoems} from "../actions/syncPoemAction";

function* workerGetCollectionsSaga() {
	try {
		const res = yield call(apiService.refreshAndFetch, "collections/get-all");

		const json = yield call([res, "json"]);

		const collections: ReduxCollection[] = parseMainApiResponse(json);

		yield put(getAllCollectionsFulfilled(collections));
	} catch (e) {
		console.log(e);
	}
}

function* workerAddCollectionSaga({collectionPayload}: ReturnType<typeof addCollection>) {
	try {
		const res = yield call(apiService.refreshAndFetch, "collections/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(collectionPayload),
		});

		const json = yield call([res, "json"]);

		const data = parseMainApiResponse(json);

		const {id, name, public: _public} = JSON.parse(data.collection);

		yield put(
			addCollectionFulfilled({
				id,
				name,
				public: _public,
			})
		);
		yield put(hidePopup());
		yield put(showFlash(data.message));
	} catch (e) {
		console.log(e);
	}
}

function* workerDeleteCollectionSaga({collectionId}: ReturnType<typeof deleteCollection>) {
	try {
		const res = yield call(
			apiService.refreshAndFetch,
			`collections/delete?collectionId=${collectionId}`,
			{
				method: "DELETE",
			}
		);

		const json = yield call([res, "json"]);

		const data = parseMainApiResponse(json);

		const deletedArtPoemIds = data.deletedArtPoemIds as number[];

		yield put(removePoemsFromCache(deletedArtPoemIds));
		yield put(removePoemsFromRenderedPoems(deletedArtPoemIds));
		yield put(getAllCollections());
		yield put(showFlash(data.message));
	} catch (e) {
		console.log(e);
	}
}

function* collectionsSaga() {
	yield takeEvery("GET_ALL_COLLECTIONS", workerGetCollectionsSaga);
	yield takeEvery("ADD_COLLECTION", workerAddCollectionSaga);
	yield takeEvery("DELETE_COLLECTION", workerDeleteCollectionSaga);
}

export default collectionsSaga;
