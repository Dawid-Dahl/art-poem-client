import React from "react";
import LinkButton from "../LinkButton";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import PoemAuthorSection from "./PoemAuthorSection";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

type Props = {
	title: string;
	buttonKind: "primary" | "white" | "black";
	backType: "history" | "main";
};

const TopBar: React.FC<Props> = ({title, buttonKind, backType}) => {
	const history = useHistory();
	const selectedArtPoem = useSelector((state: RootState) => state.syncPoemReducer.poemSelected);

	return (
		<>
			<Wrapper>
				<LinkButtonWrapper>
					{backType === "history" ? (
						<LinkButton
							title="Back"
							linkTo="/main"
							kind={buttonKind}
							onClick={() => history.goBack()}
							customization="topBarButton"
						/>
					) : backType === "main" ? (
						<LinkButton title="Back" linkTo="/main" kind={buttonKind} />
					) : null}
				</LinkButtonWrapper>
				<TitleWrapper>
					<TopBarTitle title={title}>{title}</TopBarTitle>
				</TitleWrapper>
			</Wrapper>
			{selectedArtPoem.id <= 1 ? "" : <PoemAuthorSection />}
		</>
	);
};

export default TopBar;

const Wrapper = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding: 1em 0;
`;

const LinkButtonWrapper = styled.div`
	position: absolute;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding: 2em 0;
`;

const TitleWrapper = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	@media only screen and (max-width: 800px) {
		justify-content: flex-end;
	}
`;

type TopBarTitleProps = {
	title: string;
};

const TopBarTitle = styled.h1<TopBarTitleProps>`
	display: ${({title}) => (title ? "block" : "none")};
	margin: 0px 10px;
	color: white;
	max-width: 250px;
	padding: 5px;
	border-radius: 5px;
	background-color: #00000029;
	text-align: center;
`;
