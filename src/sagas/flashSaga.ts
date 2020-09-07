import {take, delay, put, call} from "redux-saga/effects";
import {showFlash, hideFlash, showFlashFulfilled} from "../actions/flashActions";

function* workerHideFlash() {
	yield put(hideFlash());
}

function* workerShowFlash({message, milliseconds}: ReturnType<typeof showFlash>) {
	yield put(showFlashFulfilled(message));
	yield delay(milliseconds);
	yield put(hideFlash());
}

function* flashSaga() {
	while (true) {
		const action = yield take(["SHOW_FLASH", "HIDE_FLASH"]);
		if (action.type === "HIDE_FLASH") {
			yield call(workerHideFlash);
		} else if (action.type === "SHOW_FLASH") {
			yield call(workerShowFlash, action);
		}
	}
}

export default flashSaga;
