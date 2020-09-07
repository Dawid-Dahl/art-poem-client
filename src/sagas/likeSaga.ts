import {takeEvery, call, put} from "redux-saga/effects";
import {apiService} from "../api/apiService";
import {parseMainApiLikeResponse, parseMainApiResponse} from "../utils/utils";
import {
	unlikePoemFulfilled,
	likePoemFailed,
	unlikePoemFailed,
	likePoemFulfilled,
	likePoem,
	unlikePoem,
	getLikesByPoem,
	getLikesByPoemFailed,
} from "../actions/likeActions";
import {updateSelectedPoemLikes} from "../actions/syncPoemAction";
import {ReduxLike} from "../types/types";

function* workerLikePoem({artPoemId}: ReturnType<typeof likePoem>) {
	try {
		const res = yield call(apiService.refreshAndFetch, `likes/post?artPoemId=${artPoemId}`, {
			method: "POST",
		});

		const json = yield call([res, "json"]);

		if (json.success) {
			yield put(likePoemFulfilled());

			yield put(getLikesByPoem(artPoemId));
		} else {
			const parsed = parseMainApiLikeResponse(json);

			yield put(likePoemFailed());
		}
	} catch (e) {
		console.log(e);
		yield put(likePoemFailed());
	}
}

function* workerUnlikePoem({likeId, artPoemId}: ReturnType<typeof unlikePoem>) {
	try {
		const res = yield call(apiService.refreshAndFetch, `likes/delete?likeId=${likeId}`, {
			method: "DELETE",
		});

		const json = yield call([res, "json"]);

		if (json.success) {
			yield put(unlikePoemFulfilled());

			yield put(getLikesByPoem(artPoemId));
		} else {
			const parsed = parseMainApiLikeResponse(json);

			yield put(likePoemFailed());
		}
	} catch (e) {
		console.log(e);
		yield put(unlikePoemFailed());
	}
}

function* workergetLikesByPoem({artPoemId}: ReturnType<typeof getLikesByPoem>) {
	try {
		const res = yield call(apiService.refreshAndFetch, `likes/get?artPoemId=${artPoemId}`);

		const json = yield call([res, "json"]);

		const likes: ReduxLike[] = parseMainApiResponse(json);

		if (json.success) {
			yield put(updateSelectedPoemLikes(likes));
		} else {
			yield put(getLikesByPoemFailed());
		}
	} catch (e) {
		console.log(e);
		yield put(unlikePoemFailed());
	}
}

function* likeSaga() {
	yield takeEvery("LIKE_POEM", workerLikePoem);
	yield takeEvery("UNLIKE_POEM", workerUnlikePoem);
	yield takeEvery("GET_LIKES_BY_POEM", workergetLikesByPoem);
}

export default likeSaga;
