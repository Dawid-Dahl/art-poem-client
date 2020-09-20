import React from "react";
import styled, {css} from "styled-components";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import Loading from "../Loading";

const LoadingPopup: React.FC = () => {
	const loadingPopup = useSelector((state: RootState) => state.popupReducer.loadingPopup);

	return (
		<>
			<StyledWrapper active={loadingPopup.active}>
				<h1>Loading...</h1>
				<Spinner>
					<Loading />
				</Spinner>
				<Reason>
					<p>{loadingPopup.reason}</p>
				</Reason>
			</StyledWrapper>
		</>
	);
};

export default LoadingPopup;

type StyledFormProps = {
	active: boolean;
};

const StyledWrapper = styled.div<StyledFormProps>`
	min-width: 30%;
	position: fixed;
	padding: 2em;
	background-color: white;
	border-radius: var(--border-radius);
	box-shadow: 1px 0px 20px 6px #00000045;
	z-index: 20;

	h1 {
		text-align: center;
		color: black;
	}

	${props =>
		props.active
			? css`
					display: block;
			  `
			: css`
					display: none;
			  `}

	@media only screen and (max-width: 500px) {
		width: 100%;
		border-radius: 0;
		align-self: stretch;
	}
`;

const Spinner = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	@media only screen and (max-width: 500px) {
		margin: 2em;
	}
`;

const Reason = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 2em;
	padding: 1em 0 1em 0;

	p {
		text-align: center;
		color: black;
		font-size: 1.5em;
		margin: 0;
		font-weight: lighter;
	}

	@media only screen and (max-width: 500px) {
		margin: 2em;
	}
`;
