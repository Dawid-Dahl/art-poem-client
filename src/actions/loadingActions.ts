export const startLoading = () =>
	({
		type: "LOADING_STARTED",
	} as const);

export const completeLoading = () =>
	({
		type: "LOADING_COMPLETED",
	} as const);

export type LoadingActionTypes =
	| ReturnType<typeof startLoading>
	| ReturnType<typeof completeLoading>;
