import React from "react";
import styled from "styled-components";
import {useHistory} from "react-router-dom";

type Props = {
	poemId: number;
};

const ArtViewerSection: React.FC<Props> = ({poemId}) => {
	const history = useHistory();

	const handleClick = () => history.push(`/fullscreenImage?id=${poemId}`);

	return (
		<>
			<Wrapper onClick={handleClick} className="art-viewer-section">
				<EyeIcon className="art-viewer-section">👁️</EyeIcon>
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
	cursor: pointer;

	p {
		margin: 0;
	}
`;

const EyeIcon = styled.p`
	border-radius: 5px;
	text-align: center;
	font-size: 2.5em;
`;
