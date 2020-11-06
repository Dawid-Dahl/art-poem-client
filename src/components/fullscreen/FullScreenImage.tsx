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

	const imageUrl =
		cachedPoems.length === 0 ? "" : cachedPoems.find(poem => poem.id === artPoemId).imageUrl;

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
			<ImageWrapper>{imageUrl && <img src={imageUrl} alt="fullscreen-image" />}</ImageWrapper>
		</>
	);
};

export default FullscreenImage;

const ImageWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--background-grey-color);
	height: 100%;
	width: 100%;
	position: absolute;
	top: 0px;
	z-index: -2;

	img {
		position: absolute;
		top: 0px;
		max-width: 100%;
		max-height: 100%;
		z-index: -1;
		object-fit: contain;
	}
`;
