import React from "react";
import styled, {css} from "styled-components";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import AddCollectionPopup from "./AddCollectionPopup";
import EditPoemPopup from "./EditPoemPopup";
import LoadingPopup from "./LoadingPopup";

const Popup: React.FC = () => {
	const addCollectionPopup = useSelector(
		(state: RootState) => state.popupReducer.addCollectionPopup
	);
	const editPoemPopup = useSelector((state: RootState) => state.popupReducer.editPoemPopup);
	const loadingPopup = useSelector((state: RootState) => state.popupReducer.loadingPopup);

	const popups = [addCollectionPopup, editPoemPopup, loadingPopup];

	return (
		<>
			<Wrapper active={popups.some(x => x.active)}>
				<AddCollectionPopup />
				<EditPoemPopup />
				<LoadingPopup />
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
