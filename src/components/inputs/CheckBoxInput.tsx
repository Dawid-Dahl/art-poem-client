import React from "react";
import styled from "styled-components";

type Props = {
	name: string;
	isChecked: boolean;
	checked?: boolean;
	onChangeHandle: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckBoxInput: React.FC<Props> = ({name, isChecked, checked, onChangeHandle}) => (
	<StyledInput type="checkbox" checked={isChecked} name={name} onChange={onChangeHandle} />
);

export default CheckBoxInput;

const StyledInput = styled.input`
	border: solid var(--main-grey-color) 1px;
	padding: 1em 3em;
	font-size: 1em;
	border-radius: var(--border-radius-inputs);
`;
