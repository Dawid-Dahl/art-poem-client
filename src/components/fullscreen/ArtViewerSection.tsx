import React from "react";
import styled from "styled-components";

type Props = {};

const ArtViewerSection: React.FC<Props> = () => {
	return (
		<>
			<Wrapper>
				<EyeIcon>👁️</EyeIcon>
			</Wrapper>
		</>
	);
};

export default ArtViewerSection;

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	margin: 0 0 0 0.5em;
	text-align: center;
	background-color: white;
	box-shadow: var(--box-shadow);
	border-radius: 5px;
	display: flex;
	align-items: center;
	justify-content: center;

	p {
		margin: 0;
	}
`;

const EyeIcon = styled.p`
	border-radius: 5px;
	cursor: pointer;
	text-align: center;
	font-size: 2.5em;
`;
