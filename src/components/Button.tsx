import React from "react";
import styled from "styled-components";

type Props = {
	title: string;
	kind: "primary" | "white" | "black" | "grey" | "delete";
	type: "button" | "submit";
	onClickHandler?: (args: any) => any;
	minimalMinWidth?: boolean;
	noMargin?: boolean;
	dataAttribute?: {key: string; value: string};
};

const Button: React.FC<Props> = ({
	title,
	kind,
	type,
	onClickHandler,
	minimalMinWidth,
	noMargin,
	dataAttribute,
}) => {
	return (
		<>
			<Wrapper
				kind={kind}
				minimalMinWidth={minimalMinWidth}
				noMargin={noMargin}
				{...{[`data-${dataAttribute?.key}`]: dataAttribute?.value}}
			>
				<button
					onClick={onClickHandler}
					type={type}
					{...{[`data-${dataAttribute?.key}`]: dataAttribute?.value}}
				>
					{title}
				</button>
			</Wrapper>
		</>
	);
};

export default Button;

type WrapperProps = {
	kind: "primary" | "white" | "black" | "grey" | "delete";
	minimalMinWidth?: boolean;
	noMargin?: boolean;
};

const Wrapper = styled.div<WrapperProps>`
	z-index: 1;

	button {
		height: ${props => (props.minimalMinWidth ? "2em" : "3em")};
		min-width: ${props => (props.minimalMinWidth ? "3em" : "7em")};
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
				: props.kind === "grey"
				? "var(--main-grey-color)"
				: props.kind === "delete"
				? "var(--delete-color)"
				: "white"};
		margin: ${props => (props.noMargin ? "0" : "1em 0")};
		transition: all 0.2s;
		cursor: pointer;
		text-decoration: none;
		transition: all 0.2s;
		font-size: 1em;
		color: ${props =>
			props.kind === "primary"
				? "white"
				: props.kind === "white"
				? "black"
				: props.kind === "black"
				? "white"
				: props.kind === "grey"
				? "white"
				: props.kind === "delete"
				? "white"
				: "black"};
		border: black;
		outline: none;
		font-weight: lighter;
		font-family: "Roboto", sans-serif;

		:hover {
			transform: scale(1.05);
			background-color: ${props => props.kind === "primary" && "var(--hover-btn-color)"};
			box-shadow: ${props =>
				props.kind === "black"
					? "inset 0px 0px 0px 5px var(--dark-grey-color)"
					: props.kind === "grey"
					? "0px 0px 13px 5px #00000005, inset 0px 0px 0px 5px #0000001a"
					: "var(--box-shadow), inset 0px 0px 0px 5px #0000001a"};
		}
	}
`;
