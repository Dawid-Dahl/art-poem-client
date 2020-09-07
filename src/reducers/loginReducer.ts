import {LoginActionTypes} from "../actions/loginActions";

export type LoginReducerState = {
	isLoggedIn: boolean;
};

const initialState: LoginReducerState = {
	isLoggedIn: false,
};

export const loginReducer = (
	state: LoginReducerState = initialState,
	action: LoginActionTypes
): LoginReducerState => {
	switch (action.type) {
		case "LOGIN_FULFILLED":
			return {...state, isLoggedIn: true};
		case "LOGOUT_FULFILLED":
			return {...state, isLoggedIn: false};
		default:
			return state;
	}
};
