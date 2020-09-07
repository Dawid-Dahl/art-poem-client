//SYNC

import {User} from "../types/types";

export const setProfileName = (profileUser: User) =>
	({
		type: "SET_PROFILE_NAME",
		profileUser,
	} as const);

export const unsetProfileName = () =>
	({
		type: "UNSET_PROFILE_NAME",
	} as const);

export type ProfileActionTypes =
	| ReturnType<typeof setProfileName>
	| ReturnType<typeof unsetProfileName>;
