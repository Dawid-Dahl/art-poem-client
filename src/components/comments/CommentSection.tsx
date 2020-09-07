import React from "react";
import styled from "styled-components";
import CommentsDisplay from "./CommentsDisplay";
import CommentInput from "./CommentInput";

const CommentSection = () => {
	return (
		<>
			<Wrapper>
				<p className="comments-h1">Comments</p>
				<CommentsDisplay />
				<CommentInput />
			</Wrapper>
		</>
	);
};

export default CommentSection;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background-color: white;
	box-shadow: var(--box-shadow);
	border-radius: 5px;

	.comments-h1 {
		margin: 1em 0 0.5em 0;
		padding: 0;
		text-align: center;
		font-size: 1.3em;
		font-weight: bold;
	}
`;
