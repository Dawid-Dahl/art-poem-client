import {all} from "redux-saga/effects";
import asyncPoemsSaga from "./asyncPoemsSaga";
import collectionsSaga from "./collectionsSaga";
import flashSaga from "./flashSaga";
import loginSaga from "./loginSaga";
import syncPoemsSaga from "./syncPoemsSaga";
import commentSaga from "./commentSaga";
import likeSaga from "./likeSaga";
import userSaga from "./userSaga";

export default function* rootSaga() {
	yield all([
		asyncPoemsSaga(),
		syncPoemsSaga(),
		collectionsSaga(),
		flashSaga(),
		loginSaga(),
		commentSaga(),
		likeSaga(),
		userSaga(),
	]);
}
