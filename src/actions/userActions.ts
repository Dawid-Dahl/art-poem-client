import {User} from "../types/types";

export const getUser = (userId: User["id"]) =>
	({
		type: "GET_USER",
		userId,
	} as const);

export const getUserFulfilled = () =>
	({
		type: "GET_USER_FULFILLED",
	} as const);

export const getUserFailed = () =>
	({
		type: "GET_USER_FAILED",
	} as const);

export const setUser = (user: User) =>
	({
		type: "SET_USER",
		user,
	} as const);

export const removeUser = () =>
	({
		type: "REMOVE_USER",
	} as const);

export const updateProfileImage = (imageFile: FormData) =>
	({
		type: "UPDATE_PROFILE_PICTURE",
		imageFile,
	} as const);

export const updateProfileImageFulfilled = (profileImageUrl: string | null) =>
	({
		type: "UPDATE_PROFILE_PICTURE_FULFILLED",
		profileImageUrl,
	} as const);

export const updateProfileImageFailed = () =>
	({
		type: "UPDATE_PROFILE_PICTURE_FAILED",
	} as const);

export const deleteUserAccountAndData = () =>
	({
		type: "DELETE_USER_ACCOUNT_AND_DATA",
	} as const);

export const deleteUserAccountAndDataFulfilled = () =>
	({
		type: "DELETE_USER_ACCOUNT_AND_DATA_FULFILLED",
	} as const);

export const deleteUserAccountAndDataFailed = () =>
	({
		type: "DELETE_USER_ACCOUNT_AND_DATA_FAILED",
	} as const);

export type ReduxUserState = "user";

export type UserActionTypes =
	| ReturnType<typeof getUser>
	| ReturnType<typeof getUserFulfilled>
	| ReturnType<typeof getUserFailed>
	| ReturnType<typeof setUser>
	| ReturnType<typeof removeUser>
	| ReturnType<typeof updateProfileImage>
	| ReturnType<typeof updateProfileImageFulfilled>
	| ReturnType<typeof updateProfileImageFailed>
	| ReturnType<typeof deleteUserAccountAndData>
	| ReturnType<typeof deleteUserAccountAndDataFulfilled>
	| ReturnType<typeof deleteUserAccountAndDataFailed>;
