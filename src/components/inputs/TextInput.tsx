import React from "react";
import styled from "styled-components";

type Props = {
	name?: string;
	value: string;
	type: "text" | "email" | "password";
	onChangeHandle: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	minLength?: number;
	pattern?: string;
	title?: string;
};

const TextInput: React.FC<Props> = ({
	name,
	value,
	type,
	onChangeHandle,
	required,
	pattern,
	title,
	minLength,
}) => {
	return (
		<StyledInput
			id={name}
			value={value}
			name={name}
			type={type}
			placeholder={name ? [name[0].toUpperCase(), name.slice(1)].join("") : ""}
			onChange={onChangeHandle}
			required={required}
			pattern={pattern}
			title={title}
			minLength={minLength}
		/>
	);
};

export default TextInput;

const StyledInput = styled.input`
	border: solid var(--main-grey-color) 1px;
	padding: 1em 0;
	font-size: 1em;
	border-radius: var(--border-radius-inputs);
	text-align: center;
	outline: none;
	transition: all 0.3s;
	width: 100%;

	&:focus {
		box-shadow: 0 0 0 2pt var(--main-btn-color);
	}
`;
