import React, {useEffect} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";

import {RootState} from "../../store";
import {useQuery} from "../../custom-hooks/useQuery";
import {getPoem} from "../../actions/asyncPoemActions";
import TopBar from "./TopBar";

type Props = {};

const FullscreenImage: React.FC<Props> = () => {
	const cachedPoems = useSelector((state: RootState) => state.asyncPoemReducer.cachedPoems);
	const isLoading = useSelector((state: RootState) => state.loadingReducer.isLoading);
	const dispatch = useDispatch();
	const query = useQuery();

	const artPoemId = Number(query.get("id"));

	useEffect(() => {
		if (cachedPoems.length === 0) {
			dispatch(getPoem(artPoemId));
		}
	}, [cachedPoems]);

	return (
		<>
			<TopBar
				title={
					isLoading || cachedPoems.length === 0
						? ""
						: cachedPoems.find(poem => poem.id === artPoemId).title
				}
				buttonKind="white"
				backType="history"
			/>
			<StyledDiv
				imageUrl={
					cachedPoems.length === 0
						? ""
						: cachedPoems.find(poem => poem.id === artPoemId).imageUrl
				}
			/>
		</>
	);
};

export default FullscreenImage;

type StyledDivProps = {
	imageUrl: string;
};

const StyledDiv = styled.div<StyledDivProps>`
	position: absolute;
	top: 0px;
	height: 100%;
	width: 100%;
	background-image: ${props => `url(${props.imageUrl})`};
	background-repeat: no-repeat;
	background-size: contain;
	background-color: var(--dark-grey-color);
	z-index: -1;
`;
