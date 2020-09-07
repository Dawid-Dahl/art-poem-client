import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import ForgotMyPasswordForm from "./ForgotMyPasswordForm";

const ForgotMyPassword = () => {
	return (
		<Wrapper>
			<h1>artPoem.</h1>
			<h3>FORGOT YOUR PASSWORD?</h3>
			<p>Just enter the email you signed up with and we'll let you reset it.</p>
			<ForgotMyPasswordForm />
			<Link to="/login" className="loginLink">
				Go To Login
			</Link>
		</Wrapper>
	);
};

export default ForgotMyPassword;

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
