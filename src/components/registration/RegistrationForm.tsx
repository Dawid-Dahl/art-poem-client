import React, {useState} from "react";
import {FormState, AuthJsonResponse} from "../../types/types";
import {RouteComponentProps, withRouter} from "react-router-dom";
import styled from "styled-components";
import {areStringsIdentical} from "../../utils/utils";
import Button from "../Button";
import TextInput from "../inputs/TextInput";
import {showFlash} from "../../actions/flashActions";
import {useDispatch} from "react-redux";
import LoginRow from "../styled-components/LoginRow";

interface Props extends RouteComponentProps {
	postUrl: string;
	redirectUrl: string;
}

const RegistrationForm: React.FC<Props> = ({postUrl, redirectUrl, history}) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setconfirmPassword] = useState("");

	const dispatch = useDispatch();

	const turnFormStateIntoObj = (): FormState => ({
		username,
		email,
		password,
		confirmPassword,
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (areStringsIdentical(password, confirmPassword)) {
			fetch(postUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(turnFormStateIntoObj()),
			})
				.then(res => res.json())
				.then((data: AuthJsonResponse) => {
					if (data.success) {
						dispatch(showFlash(data.payload?.message ?? "", 6000));
						history.push(redirectUrl);
					} else {
						dispatch(showFlash(data.payload?.message ?? ""));
					}
				})
				.catch(err => {
					dispatch(showFlash("Cannot log in right now, try again soon!"));
					console.error(err);
				});
			e.currentTarget.reset();
		} else {
			dispatch(showFlash("Passwords do not match."));
		}
	};

	return (
		<>
			<StyledForm action="POST" className="form" onSubmit={handleSubmit}>
				<h2 className="registration-title">REGISTRATION</h2>
				<LoginRow>
					<TextInput
						name="username"
						value={username}
						type="text"
						onChangeHandle={(e: React.ChangeEvent<HTMLInputElement>) =>
							setUsername(e.target.value)
						}
						required
						minLength={4}
					/>
				</LoginRow>
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
				<Button title="Register" kind="white" type="submit" />
			</StyledForm>
		</>
	);
};

export default withRouter(RegistrationForm);

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	margin: 1em 0;
	padding: 1em 0;
	background-color: black;

	.registration-title {
		color: white;
		letter-spacing: 0.2em;
	}
`;
