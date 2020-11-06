import React from "react";
import styled from "styled-components";
import OptionElement from "./OptionElement";

type Props = {
	onChangeHandle: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	selected: string;
	list: string[];
};

const SelectElement: React.FC<Props> = ({onChangeHandle, selected, list}) => (
	<StyledSelectElement onChange={onChangeHandle} value={selected}>
		{list.map((string, i) => (
			<OptionElement key={i} value={string} />
		))}
	</StyledSelectElement>
);

export default SelectElement;

const StyledSelectElement = styled.select`
	border: solid var(--light-grey-color) 1px;
	padding: 1em;
	height: 52px;
	font-size: 1em;
	border-radius: var(--border-radius-inputs);
	cursor: pointer;
	outline: none;
	appearance: none;
	text-align-last: center;
	transition: all 0.2s;
	background-color: white;

	&:hover {
		box-shadow: 0 0 0 2pt var(--main-btn-color);
	}
`;
