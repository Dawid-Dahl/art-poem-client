import React from "react";
import styled from "styled-components";
import CommentsDisplay from "./CommentsDisplay";
import CommentInput from "./CommentInput";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const CommentSection = () => {

	const artMode = useSelector((state: RootState) => state.fullscreenReducer.artMode);

	return (
		<>
			<Wrapper artMode={artMode}>
				<p className="comments-h1">Comments</p>
				<CommentsDisplay />
				<CommentInput />
			</Wrapper>
		</>
	);
};

export default CommentSection;

type StyledWrapperProps = {
	artMode: boolean;
};

const Wrapper = styled.div<StyledWrapperProps>`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background-color: white;
	box-shadow: var(--box-shadow);
	border-radius: 5px;
	width: 100%;
	margin-top: 1em;
	margin-bottom: 2.5em;
	transition: opacity 0.5s;
	opacity: ${props => (props.artMode ? "0" : "1")};

	.comments-h1 {
		margin: 1em 0 0.5em 0;
		padding: 0;
		text-align: center;
		font-size: 1.3em;
		font-weight: bold;
	}
`;
