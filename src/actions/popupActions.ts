export const showAddCollectionPopup = () =>
	({
		type: "SHOW_ADD_COLLECTION_POPUP",
	} as const);

export const showEditPoemPopup = () =>
	({
		type: "SHOW_EDIT_POEM_POPUP",
	} as const);

export const showLoadingPopup = (reason?: string) =>
	({
		type: "SHOW_LOADING_POPUP",
		reason,
	} as const);

export const hideEditPoemPopup = () =>
	({
		type: "HIDE_EDIT_POEM_POPUP",
	} as const);

export const hidePopup = () =>
	({
		type: "HIDE_POPUP",
	} as const);

export type ReduxPopupState = "popup";

export type PopupActionTypes =
	| ReturnType<typeof showAddCollectionPopup>
	| ReturnType<typeof showEditPoemPopup>
	| ReturnType<typeof showLoadingPopup>
	| ReturnType<typeof hideEditPoemPopup>
	| ReturnType<typeof hidePopup>;
