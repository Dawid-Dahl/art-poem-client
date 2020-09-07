import React from "react";
import styled from "styled-components";
import store, {RootState} from "../../store";
import {showEditPoemPopup} from "../../actions/popupActions";
import {ReduxArtPoem} from "../../types/types";
import {useSelector} from "react-redux";

type Props = {
	poemUserId: ReduxArtPoem["userId"];
	poem: ReduxArtPoem["content"];
};

const onClickHandle = () => store.dispatch(showEditPoemPopup());

const PoemSection: React.FC<Props> = ({poemUserId, poem}) => {
	const user = useSelector((state: RootState) => state.userReducer.user);

	return (
		<>
			<Wrapper>
				{poemUserId === user?.id && (
					<span className="material-icons" onClick={onClickHandle}>
						edit
					</span>
				)}
				<p>{poem}</p>
			</Wrapper>
		</>
	);
};

export default PoemSection;

const Wrapper = styled.div`
	position: relative;
	grid-area: PoemSection;
	background-color: white;
	box-shadow: var(--box-shadow);
	border-radius: 5px;
	height: fit-content;

	span {
		position: absolute;
		margin: 5px;
		top: 0;
		right: 0;
		transition: all 0.2s;
		cursor: pointer;
	}

	span:hover {
		color: var(--hover-btn-color);
	}

	p {
		padding: 50px;
		text-align: center;
		font-size: 1.5em;
		white-space: break-spaces;
	}
`;
