import {LoginCredentials, Tokens, ForgotMyEmailPayload, ResetPasswordPayload} from "../types/types";

export const checkIfLoggedIn = (tokens: Tokens) =>
	({
		type: "CHECK_IF_LOGGED_IN",
		tokens,
	} as const);

export const login = (credentials: LoginCredentials) =>
	({
		type: "LOGIN",
		credentials,
	} as const);

export const loginFulfilled = () =>
	({
		type: "LOGIN_FULFILLED",
	} as const);

export const logout = () =>
	({
		type: "LOGOUT",
	} as const);

export const logoutFulFilled = () =>
	({
		type: "LOGOUT_FULFILLED",
	} as const);

export const sendResetPasswordEmail = (email: ForgotMyEmailPayload) =>
	({
		type: "SEND_RESET_PASSWORD_EMAIL",
		email,
	} as const);

export const sendResetPasswordEmailFulfilled = () =>
	({
		type: "SEND_RESET_PASSWORD_EMAIL_FULFILLED",
	} as const);

export const sendResetPasswordEmailFailed = () =>
	({
		type: "SEND_RESET_PASSWORD_EMAIL_FAILED",
	} as const);

export const resetPassword = ({password}: ResetPasswordPayload, resetToken: string) =>
	({
		type: "RESET_PASSWORD",
		password,
		resetToken,
	} as const);

export const resetPasswordFulfilled = () =>
	({
		type: "RESET_PASSWORD_FULFILLED",
	} as const);

export const resetPasswordFailed = () =>
	({
		type: "RESET_PASSWORD_FAILED",
	} as const);

export type LoginActionTypes =
	| ReturnType<typeof checkIfLoggedIn>
	| ReturnType<typeof login>
	| ReturnType<typeof loginFulfilled>
	| ReturnType<typeof logout>
	| ReturnType<typeof logoutFulFilled>
	| ReturnType<typeof sendResetPasswordEmail>
	| ReturnType<typeof sendResetPasswordEmailFulfilled>
	| ReturnType<typeof sendResetPasswordEmailFailed>;
