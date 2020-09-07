import {LoadingActionTypes} from "../actions/loadingActions";

export type LoadingReducerState = {
	isLoading: boolean;
};

const initialState: LoadingReducerState = {
	isLoading: false,
};

export const loadingReducer = (
	state: LoadingReducerState = initialState,
	action: LoadingActionTypes
): LoadingReducerState => {
	switch (action.type) {
		case "LOADING_STARTED":
			return {...state, isLoading: true};
		case "LOADING_COMPLETED":
			return {...state, isLoading: false};
		default:
			return state;
	}
};
