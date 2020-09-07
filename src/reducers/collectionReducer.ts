import {ReduxCollection} from "../types/types";
import {CollectionActionTypes} from "../actions/collectionActions";

export type CollectionReducerState = {
	collections: ReduxCollection[];
	collectionSelected: ReduxCollection | null;
};

const initialState: CollectionReducerState = {
	collections: [],
	collectionSelected: null,
};

export const collectionReducer = (
	state: CollectionReducerState = initialState,
	action: CollectionActionTypes
): CollectionReducerState => {
	switch (action.type) {
		case "SELECT_COLLECTION":
			return {...state, collectionSelected: action.collection};
		case "DESELECT_COLLECTION":
			return {...state, collectionSelected: null};
		case "ADD_COLLECTION_FULFILLED":
			return {...state, collections: [...state.collections, action.collection]};
		case "GET_ALL_COLLECTIONS_FULFILLED":
			return {...state, collections: action.collections};
		case "REMOVE_ALL_COLLECTIONS":
			return {...state, collections: []};
		default:
			return state;
	}
};
