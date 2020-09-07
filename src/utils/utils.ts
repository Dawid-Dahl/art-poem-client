import {
	xTokenPayload,
	User,
	RefreshedXToken,
	MainApiJsonResponse,
	Tokens,
	ValidOrRefreshedXToken,
	ReduxArtPoem,
	ReduxCollection,
	ReduxComment,
} from "../types/types";
import {authService} from "../auth/authService";
import {History} from "history";

export const localStorageService = {
	setTokensInLocalStorage(tokens: Tokens) {
		localStorage.setItem("x-token", `Bearer ${tokens.xToken}`);
		localStorage.setItem("x-refresh-token", `Bearer ${tokens.xRefreshToken}`);
	},

	removeTokensFromLocalStorage() {
		localStorage.removeItem("x-token");
		localStorage.removeItem("x-refresh-token");
	},

	setXToken(xToken: string | undefined) {
		xToken && localStorage.setItem("x-token", `Bearer ${xToken}`);
	},
};

export const convertToBytes = (text: string) => {
	if (!text.match(/k|m|g|t/)) return;

	var powers = {k: 1, m: 2, g: 3, t: 4};
	var regex = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i;

	var res = regex.exec(text);

	if (!res) return;

	return (
		parseFloat(res[1]) * Math.pow(1024, powers[res[2].toLowerCase() as "k" | "m" | "g" | "t"])
	);
};

export const range = (start: number, end: number): number[] =>
	end <= start ? [end] : [...range(start, end - 1), end];

export const getPayloadFromJwt = (jwt: string) =>
	jwt
		.split(/\s|\./g)
		.filter(x => x !== "Bearer" && x !== "bearer")
		.reduce(
			(acc, cur, i) => (i === 1 ? [...acc, JSON.parse(atob(cur))] : [...acc]),
			[] as Array<xTokenPayload>
		)[0];

export const constructUserFromId = (
	identification: string | undefined
): Promise<User> | undefined => {
	if (identification) {
		return new Promise(async (res, rej) => {
			try {
				const response = await fetch(
					`${process.env.MAIN_FETCH_URL}/api/users/get/${identification}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				const data = await response.json();

				const {id, username, profilePicture, admin, createdAt, updatedAt} = JSON.parse(
					data.payload
				).user;

				res({
					id,
					username,
					admin,
					profilePicture,
					createdAt,
					updatedAt,
				});
			} catch (e) {
				rej(e);
			}
		});
	}
	return;
};

export const areStringsIdentical = (str1: string, str2: string) =>
	str1.match(RegExp(`^${str2}$`)) ? true : false;

export const isUserProfile = (queryId: string | null, userId: User["id"] | undefined): boolean =>
	queryId === userId;

export const removeBearerFromTokenHeader = (tokenHeader: string | undefined | null) => {
	if (!tokenHeader) return;

	return tokenHeader.match(/^Bearer /) ? tokenHeader.split(" ")[1] : tokenHeader;
};

/** This function takes an x-refresh-token and uses it to return a new and refreshed x-token.
 *
 * Returns null if something went wrong.
 */
export const refreshXToken = (xRefreshToken: string | null): Promise<RefreshedXToken> => {
	return new Promise((resolve, reject) => {
		if (!xRefreshToken) {
			reject(null);
		}

		authService
			.verifyXRefreshTokenServerSide(xRefreshToken)
			.then(res => {
				if (res.isVerified) {
					resolve(res.refreshedXToken);
				} else {
					reject(null);
				}
			})
			.catch(e => (console.log(e), reject(null)));
	});
};

/** This function takes an x-refresh-token and uses it to return a new and refreshed x-token.
 *
 * Compared to "refreshXToken", this function also has the side effect of setting the x-token in localStorage before returning it.
 *
 * Returns null if something went wrong.
 */
export const refreshAndSetXToken = (xRefreshToken: string | null): Promise<RefreshedXToken> => {
	return new Promise(async (resolve, reject) => {
		try {
			const refreshedXToken = await refreshXToken(xRefreshToken);

			if (!refreshedXToken) {
				throw new Error("Couldn't refresh x-token");
			} else {
				localStorageService.setXToken(refreshedXToken);

				resolve(refreshedXToken);
			}
		} catch (e) {
			console.log(e);
			reject(null);
		}
	});
};

/** This curried function takes an x-token and attaches it to the outgoing fetch request headers.
 *
 * Returns a fetch function with the x-token header added.
 *
 * Throws an error if something went wrong.
 */
export const addXTokenHeaderToFetch = (xToken: string | null) => async (
	url: string,
	{method, headers, body}: RequestInit
): Promise<Response> => {
	if (!xToken) {
		throw new Error("There is an issue with the supplied x-token.");
	}

	const headersWithTokenAdded = {...headers, "x-token": xToken};

	const response = await fetch(url, {
		method: method,
		headers: headersWithTokenAdded,
		body,
	});

	return response;
};

export const parseMainApiResponse = (res: MainApiJsonResponse) => {
	if (res.success) {
		return JSON.parse(res.payload);
	} else {
		throw new Error("Something went wrong while calling the Api");
	}
};

export const parseMainApiLikeResponse = (res: MainApiJsonResponse) => {
	if (res.success) {
		return JSON.parse(res.payload);
	} else {
		const parsed = JSON.parse(res.payload);
		throw new Error(`${parsed.message}. You can't like an item twice!`);
	}
};

/** This function takes a xToken/xRefreshToken-pair and uses them for verification.
 *
 * Returns the x-token if valid, or a refreshed x-token if not valid but x-refresh-token is valid. The user is thereby successfully verified.
 *
 * Otherwise the user is unsuccessfully verified and the function returns null.
 */
export const verifyAndRefreshTokenIfNeeded = ({
	xToken,
	xRefreshToken,
}: Tokens): Promise<ValidOrRefreshedXToken> => {
	return new Promise((resolve, reject) => {
		if (!xRefreshToken) {
			reject(null);
			return;
		}

		if (!xToken) {
			console.log("Verifying server side!");
			authService
				.verifyXRefreshTokenServerSide(xRefreshToken)
				.then(res => {
					if (res.isVerified) {
						resolve(res.refreshedXToken);
					} else {
						reject(null);
					}
				})
				.catch(e => (console.log(e), reject(null)));
			return;
		}

		if (authService.isClientSideXTokenValid(xToken)) {
			resolve(removeBearerFromTokenHeader(xToken));
		} else {
			console.log("Verifying server side!");

			authService
				.verifyXRefreshTokenServerSide(xRefreshToken)
				.then(res => {
					if (res.isVerified) {
						resolve(res.refreshedXToken);
					} else {
						reject(null);
					}
				})
				.catch(e => (console.log(e), reject(null)));
			return;
		}
	});
};

export const forwardTo = (history: History<History.PoorMansUnknown>, location: string) =>
	history.push(location);

export const doesArtPoemBelongToUser = (poem: ReduxArtPoem, user: User) => poem.userId === user.id;

export const sortArtPoemsByCollection = (
	poems: ReduxArtPoem[],
	reduxCollection: ReduxCollection | null
) =>
	poems
		? poems.reduce<ReduxArtPoem[]>(
				(acc, cur) =>
					cur.collections.filter(collection => collection.name === reduxCollection?.name)
						.length > 0
						? [...acc, cur]
						: [...acc],
				[]
		  )
		: [];

export const comment = () => ({
	create(
		id: number,
		comment: string,
		likes: number,
		user: User,
		createdAt: string,
		updatedAt?: string
	): ReduxComment {
		return {
			id,
			comment,
			likes,
			user,
			createdAt,
			updatedAt,
		};
	},
});

export const pipe = (...fns: Function[]) => (data: any) => fns.reduce((acc, cur) => cur(acc), data);

export const scrambleArray = <T>(arr: Array<T>) =>
	[...arr].sort((a, b) => (Math.random() > 0.5 ? 1 : -1));

export const filterPoemsByPublicCollection = (poems: ReduxArtPoem[]) =>
	poems.filter(poem =>
		poem.collections.map(collection => collection.public).every(result => result === true)
	);

export const take = (n: number) => (arr: Array<any>) => arr.slice(0, n);
