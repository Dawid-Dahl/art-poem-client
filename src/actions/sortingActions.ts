export const changeSortingMethod = (payload: string) =>
	({
		type: "CHANGE_SORTING_METHOD",
		payload,
	} as const);

export type SortingActionTypes = ReturnType<typeof changeSortingMethod>;
