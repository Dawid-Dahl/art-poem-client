import {takeEvery, put} from "redux-saga/effects";
import {
	renderSocialFeed,
	renderSocialFeedFulfilled,
	renderPoems,
	renderPoemsFulfilled,
} from "../actions/syncPoemAction";
import {deselectCollection} from "../actions/collectionActions";

function* workerRenderPoems({artPoems}: ReturnType<typeof renderPoems>) {
	yield put(renderPoemsFulfilled(artPoems));
}

function* workerRenderSocialFeed({cachedPoems, poemCount}: ReturnType<typeof renderSocialFeed>) {
	yield put(deselectCollection());
	yield put(renderSocialFeedFulfilled(cachedPoems));
}

function* syncPoemsSaga() {
	yield takeEvery("RENDER_POEMS", workerRenderPoems);
	yield takeEvery("RENDER_SOCIAL_FEED", workerRenderSocialFeed);
}

export default syncPoemsSaga;
