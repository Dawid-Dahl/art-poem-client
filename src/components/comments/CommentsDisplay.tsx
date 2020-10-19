import React from "react";
import styled from "styled-components";
import Comment from "./Comment";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {ReduxComment} from "../../types/types";

const CommentsDisplay = () => {
	const poemSelected = useSelector((state: RootState) => state.syncPoemReducer.poemSelected);
	const artMode = useSelector((state: RootState) => state.fullscreenReducer.artMode);

	return (
		<>
			<Wrapper artMode={artMode}>
				{poemSelected.comments
					.sort((a, b) => a.id - b.id)
					.map((comment: ReduxComment) => (
						<Comment key={comment.id} comment={comment} />
					))}
			</Wrapper>
		</>
	);
};

export default CommentsDisplay;

type StyledWrapperProps = {
	artMode: boolean;
};

const Wrapper = styled.div<StyledWrapperProps>`
	width: 100%;
	margin: 0 0 1em 0;
	transition: opacity 0.5s;
	opacity: ${props => (props.artMode ? "0" : "1")};
`;
