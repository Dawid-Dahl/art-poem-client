import React from "react";
import styled from "styled-components";

type Props = {
	value: string;
	disabled?: boolean;
};

const OptionElement: React.FC<Props> = ({value, disabled}) => (
	<StyledOption disabled={disabled} value={value}>
		{value}
	</StyledOption>
);

export default OptionElement;

const StyledOption = styled.option`
	border: solid var(--main-grey-color) 1px;
	padding: 1em 3em;
	font-size: 1em;
`;
