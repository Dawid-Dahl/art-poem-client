import React from "react";
import styled from "styled-components";

type Props = {
	name?: string;
	value: string;
	onChangeHandle: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	required?: boolean;
	minLength?: number;
};

const TextAreaInput: React.FC<Props> = ({name, value, onChangeHandle, required, minLength}) => (
	<StyledTextArea
		id={name}
		name={name}
		value={value}
		placeholder={name ? [name[0].toUpperCase(), name.slice(1)].join("") : ""}
		onChange={onChangeHandle}
		required={required}
		minLength={minLength}
	/>
);

export default TextAreaInput;

const StyledTextArea = styled.textarea`
	border: solid var(--main-grey-color) 1px;
	height: 20vh;
	padding: 1em 3em;
	font-size: 1em;
	border-radius: var(--border-radius-inputs);
	border: var(--light-grey-color) 2px solid;
	outline: none;
	width: 100%;

	&:focus {
		box-shadow: 0 0 0 2pt var(--main-btn-color);
	}
`;
