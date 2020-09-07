import React, {useState} from "react";
import {LoginCredentials} from "../../types/types";
import Button from "../Button";
import styled from "styled-components";
import TextInput from "../inputs/TextInput";
import {useDispatch} from "react-redux";
import {login} from "../../actions/loginActions";
import LoginRow from "../styled-components/LoginRow";

const LoginForm: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();

	const turnFormStateIntoObj = (email: string, password: string): LoginCredentials => ({
		email,
		password,
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const credentials: LoginCredentials = turnFormStateIntoObj(email, password);

		dispatch(login(credentials));
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
				<h2 className="login-title">LOGIN</h2>
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
				<LoginRow>
					<TextInput
						name="password"
						value={password}
						type="password"
						onChangeHandle={(e: React.ChangeEvent<HTMLInputElement>) =>
							setPassword(e.target.value)
						}
						required
					/>
				</LoginRow>
				<Button title="Login" kind="white" type="submit" />
			</StyledForm>
		</>
	);
};

export default LoginForm;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	margin: 1em 0;
	padding: 1em 0;
	background-color: black;

	.login-title {
		color: white;
		letter-spacing: 0.2em;
	}
`;
