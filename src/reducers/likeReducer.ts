import {LikeActionTypes} from "../actions/likeActions";

export type LikeReducerState = {
	hasUserLikedPoem: boolean;
};

const initialState: LikeReducerState = {
	hasUserLikedPoem: false,
};

export const likeReducer = (
	state: LikeReducerState = initialState,
	action: LikeActionTypes
): LikeReducerState => {
	switch (action.type) {
		case "LIKE_POEM_FULFILLED":
			return {...state, hasUserLikedPoem: true};
		case "LIKE_POEM_FAILED":
			return {...state, hasUserLikedPoem: false};
		case "UNLIKE_POEM_FULFILLED":
			return {...state, hasUserLikedPoem: false};
		case "UNLIKE_POEM_FAILED":
			return {...state, hasUserLikedPoem: false};
		case "ENABLE_HAS_USER_LIKED_POEM":
			return {...state, hasUserLikedPoem: true};
		case "DISABLE_HAS_USER_LIKED_POEM":
			return {...state, hasUserLikedPoem: false};
		default:
			return state;
	}
};
