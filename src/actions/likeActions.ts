//ASYNC

import {ReduxArtPoem, ReduxLike} from "../types/types";

export const likePoem = (artPoemId: ReduxArtPoem["id"]) =>
	({
		type: "LIKE_POEM",
		artPoemId,
	} as const);

export const likePoemFulfilled = () =>
	({
		type: "LIKE_POEM_FULFILLED",
	} as const);

export const likePoemFailed = () =>
	({
		type: "LIKE_POEM_FAILED",
	} as const);

export const unlikePoem = (likeId: ReduxLike["id"], artPoemId: ReduxArtPoem["id"]) =>
	({
		type: "UNLIKE_POEM",
		likeId,
		artPoemId,
	} as const);

export const unlikePoemFulfilled = () =>
	({
		type: "UNLIKE_POEM_FULFILLED",
	} as const);

export const unlikePoemFailed = () =>
	({
		type: "UNLIKE_POEM_FAILED",
	} as const);

export const getLikesByPoem = (artPoemId: ReduxArtPoem["id"]) =>
	({
		type: "GET_LIKES_BY_POEM",
		artPoemId,
	} as const);

export const getLikesByPoemFulfilled = (likes: ReduxLike[]) =>
	({
		type: "GET_LIKES_BY_POEM_FULFILLED",
		likes,
	} as const);

export const getLikesByPoemFailed = () =>
	({
		type: "GET_LIKES_BY_POEM_FAILED",
	} as const);

//SYNC

export const enableHasUserLikedPoem = () =>
	({
		type: "ENABLE_HAS_USER_LIKED_POEM",
	} as const);

export const disableHasUserLikedPoem = () =>
	({
		type: "DISABLE_HAS_USER_LIKED_POEM",
	} as const);

export type LikeActionTypes =
	| ReturnType<typeof likePoem>
	| ReturnType<typeof likePoemFulfilled>
	| ReturnType<typeof likePoemFailed>
	| ReturnType<typeof unlikePoem>
	| ReturnType<typeof unlikePoemFulfilled>
	| ReturnType<typeof unlikePoemFailed>
	| ReturnType<typeof enableHasUserLikedPoem>
	| ReturnType<typeof disableHasUserLikedPoem>
	| ReturnType<typeof getLikesByPoem>
	| ReturnType<typeof getLikesByPoemFulfilled>
	| ReturnType<typeof getLikesByPoemFailed>;
