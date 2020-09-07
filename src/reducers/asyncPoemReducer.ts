import {ReduxArtPoem} from "../types/types";
import {AsyncPoemActionTypes} from "../actions/asyncPoemActions";

export type AsyncPoemReducerState = {
	cachedPoems: ReduxArtPoem[];
	error: null | Error;
};

const initialState: AsyncPoemReducerState = {
	cachedPoems: [],
	error: null,
};

export const asyncPoemReducer = (
	state: AsyncPoemReducerState = initialState,
	action: AsyncPoemActionTypes
): AsyncPoemReducerState => {
	switch (action.type) {
		case "GET_POEM_FULFILLED":
			return {...state, cachedPoems: action.artPoem};
		case "GET_POEMS_FULFILLED":
			return {...state, cachedPoems: action.artPoems};
		case "GET_POEMS_FAILED":
			return {...state, error: action.error};
		case "GET_POEMS_BY_USER_ID_FULFILLED":
			return {...state, cachedPoems: action.artPoems};
		case "GET_POEMS_BY_USER_ID_FAILED":
			return {...state, error: action.error};
		case "EDIT_POEM_FULFILLED":
			return {...state}; //TODO
		case "DELETE_POEM_FULFILLED":
			return {
				...state,
				cachedPoems: state.cachedPoems.filter(poem => poem.id !== action.artPoemId),
			};
		case "REMOVE_POEMS_FROM_CACHE":
			return {
				...state,
				cachedPoems: state.cachedPoems.filter(poem => !action.artPoemIds.includes(poem.id)),
			};
		case "REMOVE_ALL_POEMS_FROM_CACHE":
			return {
				...state,
				cachedPoems: [],
			};
		default:
			return state;
	}
};
