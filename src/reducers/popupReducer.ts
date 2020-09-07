import {PopupActionTypes} from "../actions/popupActions";
import * as R from "rambda";

export type Popup = {
	name: string;
	active: boolean;
};

const initialState = {
	addCollectionPopup: {
		name: "Add Collection",
		active: false,
	},
	editPoemPopup: {
		name: "Edit Poem",
		active: false,
	},
};

type PopupReducerState = typeof initialState | R.Dictionary<Popup>;

export const popupReducer = (
	state: PopupReducerState = initialState,
	action: PopupActionTypes
): PopupReducerState => {
	switch (action.type) {
		case "SHOW_ADD_COLLECTION_POPUP":
			return R.set(R.lensPath(["addCollectionPopup", "active"]), true, state);
		case "SHOW_EDIT_POEM_POPUP":
			return R.set(R.lensPath(["editPoemPopup", "active"]), true, state);
		case "HIDE_POPUP":
			return R.map<Popup, Popup, any>(x => R.set(R.lensProp("active"), false, x))(state);
		default:
			return state;
	}
};
