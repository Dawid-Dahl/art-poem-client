import {xTokenPayload, User, ServerXTokenResponse} from "../types/types";
import {getPayloadFromJwt} from "../utils/utils";
import store from "../store";
import {logout} from "../actions/loginActions";
import {showFlash} from "../actions/flashActions";

export const authService = {
	isAdmin(user: User | undefined) {
		if (user) {
			return user.admin ? true : false;
		} else {
			return false;
		}
	},

	isXTokenExpired(payload: xTokenPayload | undefined) {
		if (payload) {
			const {exp} = payload;
			return Date.now() >= exp * 1000 ? true : false;
		}
		return;
	},

	isClientSideXTokenValid(xToken: string | null): boolean {
		if (!xToken) return false;

		const payload = getPayloadFromJwt(xToken);

		if (!payload) return false;

		const {exp} = payload;

		return Date.now() >= exp * 1000 ? false : true;
	},

	async verifyXRefreshTokenServerSide(
		xRefreshToken: string | null
	): Promise<ServerXTokenResponse> {
		try {
			const res = await fetch(`${process.env.AUTH_FETCH_URL}/api/verify-jwt`, {
				method: "POST",
				headers: {
					"x-refresh-token": xRefreshToken ?? "null",
					"Content-Type": "application/json",
				},
			});

			const {success, payload} = await res.json();

			if (success) {
				const xToken = res.headers.get("x-token");

				return xToken
					? {isVerified: true, refreshedXToken: xToken}
					: {isVerified: false, refreshedXToken: null};
			} else {
				store.dispatch(showFlash(payload.message));
				store.dispatch(logout());
				return {isVerified: false, refreshedXToken: null};
			}
		} catch (e) {
			console.log(e);
			return {isVerified: false, refreshedXToken: null};
		}
	},
};
