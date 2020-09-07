import {UserActionTypes} from "../actions/userActions";
import {User} from "../types/types";
import * as R from "rambda";

export type UserReducerState = {
	user: User | null;
};

const initialState: UserReducerState = {
	user: null,
};

export const userReducer = (
	state: UserReducerState = initialState,
	action: UserActionTypes
): UserReducerState => {
	switch (action.type) {
		case "SET_USER":
			return {...state, user: action.user};
		case "REMOVE_USER":
			return {...state, user: null};
		case "UPDATE_PROFILE_PICTURE_FULFILLED":
			return R.set(R.lensPath(["user", "profilePicture"]), action.profileImageUrl, state);
		default:
			return state;
	}
};
