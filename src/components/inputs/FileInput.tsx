import React from "react";
import styled from "styled-components";

type Props = {
	name: string;
	kind: "primary" | "white" | "black" | "grey";
	isFileSelected: boolean;
	onChangeHandle: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const onClickHandle = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
	const element = e.target as HTMLInputElement;
	element.value = "";
};

const FileInput: React.FC<Props> = ({name, kind, isFileSelected, onChangeHandle}) => {
	return (
		<StyledWrapper kind={kind}>
			<input
				id={name}
				onChange={onChangeHandle}
				onClick={onClickHandle}
				name={name}
				type="file"
			/>
			<label htmlFor={name}>
				<span className="material-icons">
					{isFileSelected ? "done_outline" : "add_photo_alternate"}
				</span>
				{isFileSelected ? "" : "Choose File"}
			</label>
		</StyledWrapper>
	);
};

export default FileInput;

type WrapperProps = {
	kind: "primary" | "white" | "black" | "grey";
};

const StyledWrapper = styled.div<WrapperProps>`
	z-index: 1;

	input {
		display: none;
	}

	label {
		padding: 0 0.5em;
		height: 3em;
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
				: "white"};
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
				: "black"};
		border: black;
		font-weight: lighter;

		:hover {
			transform: scale(1.05);
			background-color: ${props => props.kind === "primary" && "var(--hover-btn-color)"};
			box-shadow: ${props =>
				props.kind === "black"
					? "inset 0px 0px 0px 5px var(--dark-grey-color)"
					: props.kind === "grey"
					? "0px 0px 13px 5px #00000005, inset 0px 0px 0px 5px #00000017"
					: "var(--box-shadow), inset 0px 0px 0px 5px #00000017"};
		}
	}
`;
