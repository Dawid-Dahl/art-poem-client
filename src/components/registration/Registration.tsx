import React from "react";
import RegistrationForm from "./RegistrationForm";
import {Link} from "react-router-dom";
import styled from "styled-components";

const Registration = () => {
	return (
		<Wrapper>
			<h1 className="registration">artPoem.</h1>
			<RegistrationForm
				postUrl={`${process.env.AUTH_FETCH_URL}/api/register`}
				redirectUrl="/login"
			/>
			<Link to="/login" className="loginLink">
				Go To Login
			</Link>
		</Wrapper>
	);
};

export default Registration;

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	h1 {
		margin-top: 5em;
	}

	.loginLink {
		color: black;
		text-decoration: none;
	}

	h2 {
		letter-spacing: 1px;
	}

	a {
		margin-bottom: 3em;
	}

	@media only screen and (max-width: 700px) {
		h1 {
			margin-top: 2em;
		}
	}
`;
