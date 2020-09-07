import React from "react";
import styled, {css} from "styled-components";

type Props = {
	isShowingPopup: boolean;
	handleClick?: () => void;
};

export const Overlay: React.FC<Props> = ({isShowingPopup, handleClick}) => {
	return (
		<>
			<StyledOverlay onClick={handleClick} isShowingPopup={isShowingPopup} />
		</>
	);
};

type StyledOverlayProps = {
	isShowingPopup: boolean;
};

const StyledOverlay = styled.div<StyledOverlayProps>`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: black;
	opacity: 0.8;
	z-index: 10;

	${props =>
		props.isShowingPopup
			? css`
					display: block;
			  `
			: css`
					display: none;
			  `}
`;
