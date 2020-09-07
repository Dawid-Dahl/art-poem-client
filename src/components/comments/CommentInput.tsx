import React, {useState} from "react";
import styled from "styled-components";
import TextInput from "../inputs/TextInput";
import ProfilePic from "../profile/ProfilePic";
import {Link} from "react-router-dom";
import CommentSubmitSection from "./CommentSubmitSection";
import {useDispatch, useSelector} from "react-redux";
import {postComment, openCommentSubmitSection} from "../../actions/commentActions";
import {RootState} from "../../store";
import {showFlash} from "../../actions/flashActions";

const CommentInput: React.FC = () => {
	const [comment, setComment] = useState("");

	const dispatch = useDispatch();

	const user = useSelector((state: RootState) => state.userReducer.user);
	const isCommentSubmitSectionActive = useSelector(
		(state: RootState) => state.commentReducer.isCommentSubmitSectionActive
	);
	const artPoemId = useSelector((state: RootState) => state.syncPoemReducer.poemSelected.id);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();

			if (comment.length === 0) {
				dispatch(showFlash("You can't post an empty comment."));
				return;
			}

			dispatch(postComment(comment, artPoemId));

			setComment("");
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			<StyledForm action="POST" autoComplete="off" onSubmit={e => handleSubmit(e)}>
				<CommentInputSectionWrapper>
					<Link to={`/profile?id=${user?.id}`}>
						<ProfilePicWrapper>
							<ProfilePic size={3} user={user} />
						</ProfilePicWrapper>
					</Link>
					<TextInputWrapper
						onClick={e =>
							!isCommentSubmitSectionActive && dispatch(openCommentSubmitSection())
						}
					>
						<TextInput
							name="Add a comment ✍🏻"
							value={comment}
							type="text"
							onChangeHandle={(e: React.ChangeEvent<HTMLInputElement>) =>
								setComment(e.target.value)
							}
						/>
					</TextInputWrapper>
				</CommentInputSectionWrapper>
				<CommentSubmitSectionWrapper
					isCommentSubmitSectionActive={isCommentSubmitSectionActive}
				>
					<CommentSubmitSection setComment={setComment} />
				</CommentSubmitSectionWrapper>
			</StyledForm>
		</>
	);
};

export default CommentInput;

const StyledForm = styled.form`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 100%;
	border-top: var(--light-grey-color) 1px solid;
`;

const CommentInputSectionWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

type CommentSubmitSectionWrapperProps = {
	isCommentSubmitSectionActive: boolean;
};

const CommentSubmitSectionWrapper = styled.div<CommentSubmitSectionWrapperProps>`
	display: ${props => (props.isCommentSubmitSectionActive ? "block" : "none")};
	width: 100%;
`;

const ProfilePicWrapper = styled.div`
	margin: 0 0 0 1em;
`;

const TextInputWrapper = styled.div`
	width: 100%;
	margin: 1em 1em 1em 1em;

	@media only screen and (max-width: 400px) {
		input {
			padding: 0.2em 0.5em;
			width: 90%;
		}
	}
`;
