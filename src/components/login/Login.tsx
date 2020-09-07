import React from "react";
import LoginForm from "./LoginForm";
import {Link} from "react-router-dom";
import styled from "styled-components";

const Login = () => {
	return (
		<Wrapper>
			<h1 className="registration">artPoem.</h1>
			<h2 className="app-description">
				Share and discover poems along with fitting art or photography
			</h2>
			<LoginForm />
			<Link to="/register" className="registrationLink">
				Go To Registration
			</Link>
			<ForgotYourPasswordLink>
				<Link style={{color: "black", textDecoration: "none"}} to="/forgot-my-password">
					Forgot Your Password?
				</Link>
			</ForgotYourPasswordLink>
		</Wrapper>
	);
};

export default Login;

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 90vh;

	.registrationLink {
		color: black;
		text-decoration: none;
	}

	.app-description {
		color: var(--main-btn-color);
		text-align: center;
		margin: 0.5em 1em 1em 1em;
		font-weight: lighter;
	}
`;

const ForgotYourPasswordLink = styled.p`
	border-top: solid 1px black;
	padding: 1.1em 0 0 0;
`;
