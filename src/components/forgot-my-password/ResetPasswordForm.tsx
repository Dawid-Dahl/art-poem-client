import React, {useState} from "react";
import {
	LoginCredentials,
	ForgotMyEmailPayload,
	ResetPasswordPayload,
	ResetPasswordFormState,
} from "../../types/types";
import Button from "../Button";
import styled from "styled-components";
import TextInput from "../inputs/TextInput";
import {useDispatch} from "react-redux";
import {resetPassword} from "../../actions/loginActions";
import LoginRow from "../styled-components/LoginRow";
import {showFlash} from "../../actions/flashActions";
import {areStringsIdentical} from "../../utils/utils";
import {useParams} from "react-router";

const ResetPasswordForm: React.FC = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setconfirmPassword] = useState("");

	const {resetToken}: {resetToken: string} = useParams();

	if (!resetToken) return <h1>No Reset Token</h1>;

	const dispatch = useDispatch();

	const turnFormStateIntoObj = (
		password: string,
		confirmPassword: string
	): ResetPasswordPayload | undefined => {
		if (areStringsIdentical(password, confirmPassword)) {
			return {
				password,
			};
		} else {
			dispatch(showFlash("Password don't match. Try again!"));
			return;
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const resetPasswordPayload: ResetPasswordPayload | undefined = turnFormStateIntoObj(
			password,
			confirmPassword
		);

		if (resetPasswordPayload) dispatch(resetPassword(resetPasswordPayload, resetToken));
	};

	return (
		<>
			<StyledForm
				action="POST"
				className="form"
				onSubmit={e => {
					e.persist();
					handleSubmit(e);
					e.currentTarget.reset();
				}}
			>
				<h2>Enter your new password</h2>
				<LoginRow>
					<TextInput
						name="password"
						value={password}
						type="password"
						onChangeHandle={(e: React.ChangeEvent<HTMLInputElement>) =>
							setPassword(e.target.value)
						}
						required
						minLength={4}
					/>
				</LoginRow>
				<LoginRow>
					<TextInput
						name="confirm-password"
						value={confirmPassword}
						type="password"
						onChangeHandle={(e: React.ChangeEvent<HTMLInputElement>) =>
							setconfirmPassword(e.target.value)
						}
						required
					/>
				</LoginRow>
				<Button title="Change" kind="white" type="submit" />
			</StyledForm>
		</>
	);
};

export default ResetPasswordForm;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 50%;
	border-radius: var(--border-radius);
	margin: 1em 0;
	padding: 1em 0;
	background-color: black;

	h2 {
		color: white;
	}

	@media only screen and (max-width: 800px) {
		width: 100%;
		border-radius: 0;
	}
`;
