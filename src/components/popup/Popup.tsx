import React from "react";
import styled, {css} from "styled-components";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import AddCollectionPopup from "./AddCollectionPopup";
import EditPoemPopup from "./EditPoemPopup";

const Popup: React.FC = () => {
	const addCollectionPopup = useSelector(
		(state: RootState) => state.popupReducer.addCollectionPopup
	);
	const editPoemPopup = useSelector((state: RootState) => state.popupReducer.editPoemPopup);

	const popups = [addCollectionPopup, editPoemPopup];

	return (
		<>
			<Wrapper active={popups.some(x => x.active)}>
				<AddCollectionPopup />
				<EditPoemPopup />
			</Wrapper>
		</>
	);
};

export default Popup;

type WrapperProps = {
	active: boolean;
};

const Wrapper = styled.div<WrapperProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	width: 100vw;
	position: absolute;

	${props =>
		props.active
			? css`
					display: flex;
			  `
			: css`
					display: none;
			  `}
`;
