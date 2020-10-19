import React from "react";
import styled from "styled-components";
import ProfilePic from "../profile/ProfilePic";
import CommentBox from "./CommentBox";
import {Link} from "react-router-dom";
import {ReduxComment} from "../../types/types";

type Props = {
	comment: ReduxComment;
};

const Comment: React.FC<Props> = ({comment}) => {
	return (
		<>
			<Wrapper>
				<ProfilePicWrapper>
					<Link to={`/profile?id=${comment.user.id}`}>
						<ProfilePic size={3} user={comment.user} />
					</Link>
				</ProfilePicWrapper>
				<CommentBoxWrapper>
					<CommentBox comment={comment} />
				</CommentBoxWrapper>
			</Wrapper>
		</>
	);
};

export default Comment;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
`;

const ProfilePicWrapper = styled.div`
	margin: 0 0 0 1em;

	@media only screen and (max-width: 1000px) {
		display: none;
	}
`;
const CommentBoxWrapper = styled.div`
	width: 100%;
	margin: 0.5em 1em;
`;
