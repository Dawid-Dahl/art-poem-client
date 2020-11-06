import {ProfileActionTypes} from "../actions/profileActions";
import {SortingActionTypes} from "../actions/sortingActions";
import {SortingMethod} from "../types/enums";
import {User} from "../types/types";

export type SortingReducerState = {
	sortingMethod: string;
};

const initialState: SortingReducerState = {
	sortingMethod: SortingMethod.LatestFirst,
};

export const sortingReducer = (
	state: SortingReducerState = initialState,
	action: SortingActionTypes
): SortingReducerState => {
	switch (action.type) {
		case "CHANGE_SORTING_METHOD":
			return {...state, sortingMethod: action.payload};
		default:
			return state;
	}
};
