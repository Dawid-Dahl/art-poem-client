import {ReduxCollection, AddCollectionFormObject} from "../types/types";

export const selectCollection = (collection: ReduxCollection) =>
	({
		type: "SELECT_COLLECTION",
		collection,
	} as const);

export const deselectCollection = () =>
	({
		type: "DESELECT_COLLECTION",
	} as const);

export const addCollection = (collectionPayload: AddCollectionFormObject) =>
	({
		type: "ADD_COLLECTION",
		collectionPayload,
	} as const);

export const addCollectionFulfilled = (collection: ReduxCollection) =>
	({
		type: "ADD_COLLECTION_FULFILLED",
		collection,
	} as const);

export const getAllCollections = () =>
	({
		type: "GET_ALL_COLLECTIONS",
	} as const);

export const getAllCollectionsFulfilled = (collections: ReduxCollection[]) =>
	({
		type: "GET_ALL_COLLECTIONS_FULFILLED",
		collections,
	} as const);

export const deleteCollection = (collectionId: ReduxCollection["id"]) =>
	({
		type: "DELETE_COLLECTION",
		collectionId,
	} as const);

export const deleteCollectionFulfilled = () =>
	({
		type: "DELETE_COLLECTION_FULFILLED",
	} as const);

export const deleteCollectionFailed = () =>
	({
		type: "DELETE_COLLECTION_FAILED",
	} as const);

export const removeAllCollections = () =>
	({
		type: "REMOVE_ALL_COLLECTIONS",
	} as const);

export type ReduxCollectionState = "collection";

export type CollectionActionTypes =
	| ReturnType<typeof selectCollection>
	| ReturnType<typeof deselectCollection>
	| ReturnType<typeof addCollection>
	| ReturnType<typeof addCollectionFulfilled>
	| ReturnType<typeof getAllCollections>
	| ReturnType<typeof getAllCollectionsFulfilled>
	| ReturnType<typeof deleteCollection>
	| ReturnType<typeof deleteCollectionFulfilled>
	| ReturnType<typeof deleteCollectionFailed>
	| ReturnType<typeof removeAllCollections>;
