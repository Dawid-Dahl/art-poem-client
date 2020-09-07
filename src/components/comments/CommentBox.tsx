import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import ProfilePic from "../profile/ProfilePic";
import {ReduxComment} from "../../types/types";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import EditDeleteButtons from "./EditDeleteButtons";
import {useOutsideCommentClicker} from "../../custom-hooks/useOutsideCommentClicker";
import EditCommentTextArea from "./EditCommentTextArea";

dayjs.extend(relativeTime);

type Props = {
	comment: ReduxComment;
};

const CommentBox: React.FC<Props> = ({comment}) => {
	const {id, user, createdAt, comment: commentContent} = comment;

	const userId = useSelector((state: RootState) => state.userReducer.user?.id);
	const isEditingComment = useSelector(
		(state: RootState) => state.commentReducer.isEditingComment
	);
	const commentSelected = useSelector((state: RootState) => state.commentReducer.commentSelected);

	const [editComment, setEditComment] = useState(commentContent);

	useOutsideCommentClicker();

	useEffect(() => {
		setEditComment(commentSelected ? commentSelected.comment : "");
	}, [commentSelected]);

	return (
		<>
			<Wrapper>
				<PresentationWrapper data-comment-id={id}>
					<ProfilePicWrapper data-comment-id={id}>
						<Link to={`/profile?id=${comment.user.id}`}>
							<ProfilePic size={3} user={comment.user} />
						</Link>
					</ProfilePicWrapper>
					<NameDateWrapper data-comment-id={id}>
						<h2 data-comment-id={id}>{user.username}</h2>
						<h3 data-comment-id={id}>{dayjs(Date.parse(createdAt)).fromNow()}</h3>
					</NameDateWrapper>
					{user.id === userId && (
						<EditDeleteButtons
							data-comment-id={id}
							comment={comment}
							isEditingComment={isEditingComment}
							setEditComment={setEditComment}
						/>
					)}
				</PresentationWrapper>
				{isEditingComment && commentSelected?.id === comment.id ? (
					<EditCommentTextArea
						dataCommentId={id}
						value={editComment}
						onChangeHandler={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
							setEditComment(e.target.value)
						}
						editCommentContent={editComment}
						setEditComment={setEditComment}
					/>
				) : (
					<p data-comment-id={id}>{commentContent}</p>
				)}
			</Wrapper>
		</>
	);
};

export default CommentBox;

const Wrapper = styled.div`
	border: 1px solid var(--light-grey-color);
	border-radius: var(--border-radius);
	padding: 1em;

	p {
		margin: 0;
		padding: 0;
		font-weight: lighter;
		color: var(--comment-grey);
		white-space: break-spaces;
	}

	&:hover {
		span {
			opacity: 80%;
		}
	}

	@media only screen and (max-width: 1000px) {
		padding: 0.5em 1em;
	}
`;

const NameDateWrapper = styled.div`
	width: 100%;

	@media only screen and (min-width: 1000px) {
		display: flex;
	}
`;

const PresentationWrapper = styled.div`
	display: flex;
	align-items: center;
	margin: 0;

	h2 {
		font-size: 0.9em;
		margin: 0 0.5em 0 0;
		font-weight: 600;
	}

	h3 {
		font-size: 0.8em;
		margin: 0;
		font-weight: lighter;
		width: 100%;
	}
`;

const ProfilePicWrapper = styled.div`
	margin: 0 0.5em 0.5em 0;

	@media only screen and (min-width: 1000px) {
		display: none;
	}
`;
