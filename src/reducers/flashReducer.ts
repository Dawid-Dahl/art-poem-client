import {FlashActionTypes} from "../actions/flashActions";

export type FlashReducerState = {
	isShowingFlash: boolean;
	flashMessage: string;
};

const initialState: FlashReducerState = {
	isShowingFlash: false,
	flashMessage: "",
};

export const flashReducer = (
	state: FlashReducerState = initialState,
	action: FlashActionTypes
): FlashReducerState => {
	switch (action.type) {
		case "SHOW_FLASH_FULFILLED":
			return {...state, isShowingFlash: true, flashMessage: action.message};
		case "HIDE_FLASH":
			return {...state, isShowingFlash: false};
		default:
			return state;
	}
};
