import {takeEvery, call, put} from "redux-saga/effects";
import {
	postComment,
	getComments,
	deleteComment,
	deselectComment,
	editComment,
	editCommentFulfilled,
	disableCommentEdit,
	getCommentsFailed,
} from "../actions/commentActions";
import {apiService} from "../api/apiService";
import {parseMainApiResponse} from "../utils/utils";
import {ReduxComment} from "../types/types";
import {updateSelectedPoemComments} from "../actions/syncPoemAction";

function* workerGetComments({artPoemId, commentCount}: ReturnType<typeof getComments>) {
	try {
		const res = yield call(
			apiService.refreshAndFetch,
			`comments/get?artPoemId=${artPoemId}&commentCount=${commentCount}`
		);

		const json = yield call([res, "json"]);

		const comments: ReduxComment[] = parseMainApiResponse(json);

		if (json.success) {
			yield put(updateSelectedPoemComments(comments));
		} else {
			yield put(getCommentsFailed());
		}
	} catch (e) {
		console.log(e);
	}
}

function* workerPostComment({commentContent, artPoemId}: ReturnType<typeof postComment>) {
	try {
		const res = yield call(apiService.refreshAndFetch, "comments/post", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({artPoemId: artPoemId, commentContent: commentContent}),
		});

		const json = yield call([res, "json"]);

		const insertResult = JSON.parse(parseMainApiResponse(json).insertResult);

		yield put(getComments(artPoemId));
	} catch (e) {
		console.log(e);
	}
}

function* workerEditComment({
	commentContent,
	commentId,
	artPoemId,
}: ReturnType<typeof editComment>) {
	try {
		const res = yield call(apiService.refreshAndFetch, `comments/edit?commentId=${commentId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({commentId: commentId, commentContent: commentContent}),
		});

		const json = yield call([res, "json"]);

		const insertResult = JSON.parse(parseMainApiResponse(json).insertResult);

		yield put(getComments(artPoemId));
		yield put(disableCommentEdit());
		yield put(deselectComment());
		yield put(editCommentFulfilled(insertResult as ReduxComment));
	} catch (e) {
		console.log(e);
	}
}

function* workerDeletePostComment({commentId, artPoemId}: ReturnType<typeof deleteComment>) {
	try {
		const res = yield call(
			apiService.refreshAndFetch,
			`comments/delete?commentId=${commentId}`,
			{
				method: "DELETE",
			}
		);

		yield put(getComments(artPoemId));
	} catch (e) {
		console.log(e);
	}
}

function* commentSaga() {
	yield takeEvery("GET_COMMENTS", workerGetComments);
	yield takeEvery("POST_COMMENT", workerPostComment);
	yield takeEvery("EDIT_COMMENT", workerEditComment);
	yield takeEvery("DELETE_COMMENT", workerDeletePostComment);
}

export default commentSaga;
