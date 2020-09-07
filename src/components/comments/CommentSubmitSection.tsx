import React from "react";
import styled from "styled-components";
import Button from "../Button";
import {useDispatch} from "react-redux";
import {closeCommentSubmitSection} from "../../actions/commentActions";

type Props = {
	setComment: React.Dispatch<React.SetStateAction<string>>;
};

const CommentSubmitSection: React.FC<Props> = ({setComment}) => {
	const dispatch = useDispatch();

	const handleCancelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		setComment("");
		dispatch(closeCommentSubmitSection());
	};

	return (
		<>
			<Wrapper>
				<ButtonWrapper>
					<Button
						title="Cancel"
						kind="grey"
						type="button"
						minimalMinWidth
						noMargin
						onClickHandler={handleCancelClick}
					/>
				</ButtonWrapper>
				<ButtonWrapper>
					<Button title="Post" kind="primary" type="submit" minimalMinWidth noMargin />
				</ButtonWrapper>
			</Wrapper>
		</>
	);
};

export default CommentSubmitSection;

const Wrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	margin: 0 1.5em 1em 0;
`;

const ButtonWrapper = styled.div`
	margin: 0 0.3em;
`;
