import {refreshAndSetXToken} from "../utils/utils";

export const apiService = {
	async refreshAndFetch(input: RequestInfo, init: RequestInit = {}): Promise<Response> {
		await refreshAndSetXToken(localStorage.getItem("x-refresh-token"));

		const xTokenHeader = {
			"x-token": localStorage.getItem("x-token") ?? "null",
		};

		const initWithXTokenHeader = {...init, headers: {...init.headers, ...xTokenHeader}};

		try {
			const response = await fetch(
				`${process.env.MAIN_FETCH_URL}/api/${input}`,
				initWithXTokenHeader
			);

			return response;
		} catch (e) {
			console.log(e);
			return e;
		}
	},
	async refreshAndFetchFromAuthServer(
		input: RequestInfo,
		init: RequestInit = {}
	): Promise<Response> {
		await refreshAndSetXToken(localStorage.getItem("x-refresh-token"));

		const xTokenHeader = {
			"x-token": localStorage.getItem("x-token") ?? "null",
		};

		const initWithXTokenHeader = {...init, headers: {...init.headers, ...xTokenHeader}};

		try {
			const response = await fetch(
				`${process.env.AUTH_FETCH_URL}/api/${input}`,
				initWithXTokenHeader
			);

			return response;
		} catch (e) {
			console.log(e);
			return e;
		}
	},
};
