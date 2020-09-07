import React, {useState} from "react";
import {LoginCredentials, ForgotMyEmailPayload} from "../../types/types";
import Button from "../Button";
import styled from "styled-components";
import TextInput from "../inputs/TextInput";
import {useDispatch} from "react-redux";
import {sendResetPasswordEmail} from "../../actions/loginActions";
import LoginRow from "../styled-components/LoginRow";

const ForgotMyPasswordForm: React.FC = () => {
	const [email, setEmail] = useState("");

	const dispatch = useDispatch();

	const turnFormStateIntoObj = (email: string): ForgotMyEmailPayload => ({
		email,
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const forgotMyEmailPayload: ForgotMyEmailPayload = turnFormStateIntoObj(email);

		dispatch(sendResetPasswordEmail(forgotMyEmailPayload));
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
				<h2>Email Address</h2>
				<LoginRow>
					<TextInput
						name="email"
						value={email}
						type="email"
						onChangeHandle={(e: React.ChangeEvent<HTMLInputElement>) =>
							setEmail(e.target.value)
						}
						required
					/>
				</LoginRow>
				<Button title="Reset" kind="white" type="submit" />
			</StyledForm>
		</>
	);
};

export default ForgotMyPasswordForm;

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
