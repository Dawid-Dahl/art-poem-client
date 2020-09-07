import React from "react";
import styled from "styled-components";
import Comment from "./Comment";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {ReduxComment} from "../../types/types";

const CommentsDisplay = () => {
	const poemSelected = useSelector((state: RootState) => state.syncPoemReducer.poemSelected);

	return (
		<>
			<Wrapper>
				{poemSelected.comments.map((comment: ReduxComment) => (
					<Comment key={comment.id} comment={comment} />
				))}
			</Wrapper>
		</>
	);
};

export default CommentsDisplay;

const Wrapper = styled.div`
	width: 100%;
	margin: 0 0 1em 0;
`;
