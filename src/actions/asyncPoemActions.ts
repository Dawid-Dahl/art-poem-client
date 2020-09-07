import {ReduxArtPoem, ReduxCollection, User} from "../types/types";

//READ

export const getPoem = (artPoemId: ReduxArtPoem["id"]) =>
	({
		type: "GET_POEM",
		artPoemId,
	} as const);

export const getPoemFulfilled = (artPoem: ReduxArtPoem[]) =>
	({
		type: "GET_POEM_FULFILLED",
		artPoem,
	} as const);

export const getPoemFailed = () =>
	({
		type: "GET_POEM_FAILED",
	} as const);

export const getPoems = (poemCount = 10) =>
	({
		type: "GET_POEMS",
		poemCount,
	} as const);

export const getPoemsFulfilled = (artPoems: ReduxArtPoem[]) =>
	({
		type: "GET_POEMS_FULFILLED",
		artPoems,
	} as const);

export const getPoemsFailed = (error: Error) =>
	({
		type: "GET_POEMS_FAILED",
		error,
	} as const);

export const getPoemsByUserId = (id: User["id"], poemCount = 10) =>
	({
		type: "GET_POEMS_BY_USER_ID",
		id,
		poemCount,
	} as const);

export const getPoemsByUserIdFulfilled = (artPoems: ReduxArtPoem[]) =>
	({
		type: "GET_POEMS_BY_USER_ID_FULFILLED",
		artPoems,
	} as const);

export const getPoemsByUserIdFailed = (error: Error) =>
	({
		type: "GET_POEMS_BY_USER_ID_FAILED",
		error,
	} as const);

//CREATE

export const uploadPoem = (payload: FormData) =>
	({
		type: "UPLOAD_POEM",
		payload,
	} as const);

export const uploadPoemFulfilled = () =>
	({
		type: "UPLOAD_POEM_FULFILLED",
	} as const);

//UPDATE

export const editPoem = (payload: FormData) =>
	({
		type: "EDIT_POEM",
		payload,
	} as const);

export const editPoemFulfilled = () =>
	({
		type: "EDIT_POEM_FULFILLED",
	} as const);

//DELETE

export const deletePoem = (artPoemId: ReduxArtPoem["id"]) =>
	({
		type: "DELETE_POEM",
		artPoemId,
	} as const);

export const deletePoemFulfilled = (artPoemId: ReduxArtPoem["id"]) =>
	({
		type: "DELETE_POEM_FULFILLED",
		artPoemId,
	} as const);

export const removePoemsFromCache = (artPoemIds: Array<ReduxArtPoem["id"]>) =>
	({
		type: "REMOVE_POEMS_FROM_CACHE",
		artPoemIds,
	} as const);

export const removeAllPoemsFromCache = () =>
	({
		type: "REMOVE_ALL_POEMS_FROM_CACHE",
	} as const);

export type ReduxPoemState = "poem";

export type AsyncPoemActionTypes =
	| ReturnType<typeof getPoem>
	| ReturnType<typeof getPoemFulfilled>
	| ReturnType<typeof getPoemFailed>
	| ReturnType<typeof uploadPoem>
	| ReturnType<typeof uploadPoemFulfilled>
	| ReturnType<typeof getPoems>
	| ReturnType<typeof getPoemsFulfilled>
	| ReturnType<typeof getPoemsFailed>
	| ReturnType<typeof getPoemsByUserId>
	| ReturnType<typeof getPoemsByUserIdFulfilled>
	| ReturnType<typeof getPoemsByUserIdFailed>
	| ReturnType<typeof editPoem>
	| ReturnType<typeof editPoemFulfilled>
	| ReturnType<typeof deletePoem>
	| ReturnType<typeof deletePoemFulfilled>
	| ReturnType<typeof removePoemsFromCache>
	| ReturnType<typeof removeAllPoemsFromCache>;
