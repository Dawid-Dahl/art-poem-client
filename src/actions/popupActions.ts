export const showAddCollectionPopup = () =>
	({
		type: "SHOW_ADD_COLLECTION_POPUP",
	} as const);

export const showEditPoemPopup = () =>
	({
		type: "SHOW_EDIT_POEM_POPUP",
	} as const);

export const hidePopup = () =>
	({
		type: "HIDE_POPUP",
	} as const);

export type ReduxPopupState = "popup";

export type PopupActionTypes =
	| ReturnType<typeof showAddCollectionPopup>
	| ReturnType<typeof showEditPoemPopup>
	| ReturnType<typeof hidePopup>;
