import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

type Props = {
	title: string;
	linkTo: string;
	onClick?: () => void;
	kind: "primary" | "white" | "black";
	customization?: "desktopButton" | "topBarButton";
};

const LinkButton: React.FC<Props> = ({title, linkTo, onClick, kind, customization}) => {
	return (
		<>
			<Wrapper kind={kind}>
				<Link to={linkTo} onClick={onClick}>
					<StyledDiv kind={kind} customization={customization}>
						{title}
					</StyledDiv>
				</Link>
			</Wrapper>
		</>
	);
};

export default LinkButton;

type StyledProps = {
	kind: string;
	customization?: string;
};

const Wrapper = styled.div<StyledProps>`
	z-index: 1;

	a {
		text-decoration: none;
		color: ${props =>
			props.kind === "primary"
				? "white"
				: props.kind === "white"
				? "black"
				: props.kind === "black"
				? "white"
				: "black"};
		transition: all 0.2s;
	}
`;

const StyledDiv = styled.div<StyledProps>`
	height: 3em;
	min-width: 7em;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 30px;
	background-color: ${props =>
		props.kind === "primary"
			? "var(--main-btn-color)"
			: props.kind === "white"
			? "white"
			: props.kind === "black"
			? "black"
			: "white"};
	margin: 0px 20px;
	transition: all 0.2s;
	cursor: pointer;
	border: black;
	box-shadow: var(--box-shadow);
	font-weight: lighter;

	:hover {
		transform: scale(1.05);
		background-color: ${props => props.kind === "primary" && "var(--hover-btn-color)"};
		box-shadow: ${props =>
			props.kind === "black"
				? "inset 0px 0px 0px 5px var(--dark-grey-color)"
				: "var(--box-shadow), inset 0px 0px 0px 5px #00000017"};
	}

	/* This media query is here to make sure that the desktop nav buttons don't take up space at tablet and mobile devices. */

	@media only screen and (max-width: 700px) {
		display: ${props => props.customization === "desktopButton" && "none"};
	}

	@media only screen and (max-width: 450px) {
		min-width: ${props => props.customization === "topBarButton" && "3em"};
	}
`;
