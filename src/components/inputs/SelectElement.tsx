import React from "react";
import styled from "styled-components";
import OptionElement from "./OptionElement";
import {ReduxCollection} from "../../types/types";

type Props = {
	onChangeHandle: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	selectedCollection: string;
	isSocialFeedSelectable?: boolean;
	collections: ReduxCollection[];
};

const SelectElement: React.FC<Props> = ({
	onChangeHandle,
	selectedCollection,
	isSocialFeedSelectable = false,
	collections,
}) => (
	<StyledSelectElement onChange={onChangeHandle} value={selectedCollection}>
		{isSocialFeedSelectable && <OptionElement key={0} value="Social Feed" />}
		{collections.map(collection => (
			<OptionElement key={collection.id} value={collection.name} />
		))}
	</StyledSelectElement>
);

export default SelectElement;

const StyledSelectElement = styled.select`
	border: solid var(--light-grey-color) 1px;
	width: 100%;
	height: 52px;
	font-size: 1em;
	border-radius: var(--border-radius-inputs);
	cursor: pointer;
	outline: none;
	appearance: none;
	text-align-last: center;
	transition: all 0.2s;

	&:hover {
		box-shadow: 0 0 0 2pt var(--main-btn-color);
	}
`;
