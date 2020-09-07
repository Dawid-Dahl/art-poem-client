import React from "react";
import styled from "styled-components";
import ResetPasswordForm from "./ResetPasswordForm";
import {Link} from "react-router-dom";

const ResetPassword = () => {
	return (
		<Wrapper>
			<h1>artPoem.</h1>
			<h3>RESET PASSWORD</h3>
			<p>Password must be at least 4 characters long.</p>
			<ResetPasswordForm />
			<Link to="/login" className="loginLink">
				Go To Login
			</Link>
		</Wrapper>
	);
};

export default ResetPassword;

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 90vh;

	.loginLink {
		color: black;
		text-decoration: none;
	}

	h3 {
		margin: 0.2em;
		text-align: center;
		padding: 0 1em;
	}

	p {
		margin: 0.2em;
		text-align: center;
		padding: 0 1em;
	}
`;

const ForgotYourPasswordLink = styled.p`
	border-top: solid 1px black;
	padding: 1.1em 0 0 0;
`;
