import React, {Dispatch} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {editComment, disableCommentEdit, deselectComment} from "../../actions/commentActions";
import {RootState} from "../../store";
import {showFlash} from "../../actions/flashActions";
import Button from "../Button";
import {ReduxComment, ReduxArtPoem} from "../../types/types";

const handleSubmit = (e: React.FormEvent<HTMLFormElement>, dispatch: Dispatch<any>) => (
	editCommentContent: string,
	commentSelected: ReduxComment | null,
	artPoemId: ReduxArtPoem["id"]
) => {
	try {
		e.preventDefault();

		if (editCommentContent.length === 0) {
			dispatch(showFlash("You can't post an empty comment."));
			return;
		}

		if (editCommentContent === commentSelected?.comment) {
			dispatch(disableCommentEdit());
			dispatch(deselectComment());
			return;
		}

		if (commentSelected) {
			dispatch(editComment(editCommentContent, commentSelected.id, artPoemId));
		}
	} catch (e) {
		console.log(e);
	}
};

type Props = {
	dataCommentId: number;
	value: string;
	onChangeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	editCommentContent: string;
	setEditComment: React.Dispatch<React.SetStateAction<string>>;
};

const EditCommentTextArea: React.FC<Props> = ({
	dataCommentId,
	value,
	onChangeHandler,
	editCommentContent,
}) => {
	const dispatch = useDispatch();

	const commentSelected = useSelector((state: RootState) => state.commentReducer.commentSelected);
	const poemSelected = useSelector((state: RootState) => state.syncPoemReducer.poemSelected);

	return (
		<>
			<StyledForm
				action="POST"
				autoComplete="off"
				onSubmit={e =>
					handleSubmit(e, dispatch)(editCommentContent, commentSelected, poemSelected.id)
				}
				data-comment-id={dataCommentId}
			>
				<TextArea
					data-comment-id={dataCommentId}
					value={value}
					onChange={onChangeHandler}
					rows={3}
					cols={50}
				/>
				<Button
					title="Post"
					kind="primary"
					type="submit"
					minimalMinWidth
					noMargin
					dataAttribute={{key: "comment-id", value: dataCommentId.toString()}}
				/>
			</StyledForm>
		</>
	);
};

export default EditCommentTextArea;

const StyledForm = styled.form``;

const TextArea = styled.textarea`
	width: 100%;
	border-radius: 5px;
	color: var(--comment-grey);
	outline: none;
	transition: box-shadow 0.3s;
	font-family: "Roboto", sans-serif;
	font-size: 16px;
	font-weight: lighter;

	&:focus {
		box-shadow: 0 0 0 2pt var(--main-btn-color);
	}
`;
