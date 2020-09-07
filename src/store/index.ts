import {createStore, combineReducers, applyMiddleware} from "redux";
import {
	flashReducer,
	asyncPoemReducer,
	syncPoemReducer,
	userReducer,
	popupReducer,
	collectionReducer,
	loginReducer,
	loadingReducer,
	commentReducer,
	likeReducer,
	profileReducer,
} from "../reducers/reducers";
import {composeWithDevTools} from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers({
	flashReducer,
	asyncPoemReducer,
	syncPoemReducer,
	userReducer,
	popupReducer,
	collectionReducer,
	loginReducer,
	loadingReducer,
	commentReducer,
	likeReducer,
	profileReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const middleware = applyMiddleware(sagaMiddleware);

export const store = createStore(rootReducer, composeWithDevTools(middleware));

// then run the saga
sagaMiddleware.run(rootSaga);

export default store;
