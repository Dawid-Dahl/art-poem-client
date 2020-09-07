import {ProfileActionTypes} from "../actions/profileActions";
import {User} from "../types/types";

export type ProfileReducerState = {
	profileUser: User | null;
};

const initialState: ProfileReducerState = {
	profileUser: null,
};

export const profileReducer = (
	state: ProfileReducerState = initialState,
	action: ProfileActionTypes
): ProfileReducerState => {
	switch (action.type) {
		case "SET_PROFILE_NAME":
			return {...state, profileUser: action.profileUser};
		case "UNSET_PROFILE_NAME":
			return {...state, profileUser: null};
		default:
			return state;
	}
};
