import React, {Dispatch} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {enableArtMode, disableArtMode} from "../../actions/fullscreenActions";
import {RootState} from "../../store";

type Props = {};

const ArtViewerSection: React.FC<Props> = () => {
	const dispatch = useDispatch();

	const artMode = useSelector((state: RootState) => state.fullscreenReducer.artMode);

	const handleClick = (
		e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
		dispatch: Dispatch<any>,
		artMode: boolean
	) => (artMode ? dispatch(disableArtMode()) : dispatch(enableArtMode()));

	return (
		<>
			<Wrapper
				onClick={e => handleClick(e, dispatch, artMode)}
				className="art-viewer-section"
			>
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
