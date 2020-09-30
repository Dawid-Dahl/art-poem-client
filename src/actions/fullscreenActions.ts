export const enableArtMode = () =>
	({
		type: "ENABLE_ART_MODE",
	} as const);

export const disableArtMode = () =>
	({
		type: "DISABLE_ART_MODE",
	} as const);

export type FullscreenActionTypes =
	| ReturnType<typeof enableArtMode>
	| ReturnType<typeof disableArtMode>;
