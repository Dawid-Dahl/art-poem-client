import {FullscreenActionTypes} from "../actions/fullscreenActions";

export type FullscreenReducer = {
	artMode: boolean;
};

const initialState: FullscreenReducer = {
	artMode: false,
};

export const fullscreenReducer = (
	state: FullscreenReducer = initialState,
	action: FullscreenActionTypes
): FullscreenReducer => {
	switch (action.type) {
		case "ENABLE_ART_MODE":
			return {...state, artMode: true};
		case "DISABLE_ART_MODE":
			return {...state, artMode: false};
		default:
			return state;
	}
};
