import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import ArtPoemGrid from "./art-poem-grid/ArtPoemGrid";
import {getAllCollections} from "../actions/collectionActions";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../store";
import {getPoems} from "../actions/asyncPoemActions";
import {getPoemsByUserAndCollection} from "../actions/syncPoemAction";
import {
	randomizeArtPoemsAndFilterOutPrivate,
	sortArtPoemsByLastAndFilterOutPrivate,
	sortArtPoemsByLatestAndFilterOutPrivate,
} from "../utils/utils";
import Button from "./Button";
import {SortingMethod} from "../types/enums";
import SelectElement from "./inputs/SelectElement";
import {changeSortingMethod} from "../actions/sortingActions";

const Main = () => {
	const cachedPoems = useSelector((state: RootState) => state.asyncPoemReducer.cachedPoems);
	const user = useSelector((state: RootState) => state.userReducer.user);
	const sortingMethod = useSelector((state: RootState) => state.sortingReducer.sortingMethod);
	const collectionSelected = useSelector(
		(state: RootState) => state.collectionReducer.collectionSelected
	);

	const renderedPoems = useSelector((state: RootState) => state.syncPoemReducer.renderedPoems);
	const dispatch = useDispatch();

	useEffect(() => {
		collectionSelected &&
			user &&
			dispatch(getPoemsByUserAndCollection(cachedPoems, collectionSelected, user));
	}, [collectionSelected]);

	useEffect(() => {
		dispatch(getAllCollections());
	}, []);

	useEffect(() => {
		dispatch(dispatch(getPoems(50)));
	}, []);

	return (
		<Wrapper>
			<Navbar />
			<InnerWrapper>
				{collectionSelected ? <h1></h1> : <h1>Discover</h1>}
				<SelectWrapper>
					<SelectElement
						onChangeHandle={(e: React.ChangeEvent<HTMLSelectElement>) =>
							dispatch(changeSortingMethod(e.target.value))
						}
						selected={sortingMethod}
						list={Object.values(SortingMethod)}
					/>
				</SelectWrapper>
				<ArtPoemGrid
					renderedPoems={
						sortingMethod === SortingMethod.LatestFirst
							? sortArtPoemsByLatestAndFilterOutPrivate(renderedPoems)
							: sortingMethod === SortingMethod.LastFirst
							? sortArtPoemsByLastAndFilterOutPrivate(renderedPoems)
							: randomizeArtPoemsAndFilterOutPrivate(renderedPoems)
					}
				/>
				{sortingMethod === SortingMethod.Random && (
					<ButtonWrapper>
						{cachedPoems.length >= 12 && (
							<Button
								title="Discover More"
								kind="grey"
								type="button"
								onClickHandler={() => dispatch(getPoems(50))}
							/>
						)}
					</ButtonWrapper>
				)}
			</InnerWrapper>
		</Wrapper>
	);
};

export default Main;

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const InnerWrapper = styled.div`
	position: absolute;
	top: 8em;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	h1 {
		margin: 1em 0 1em 0;
	}
`;

const SelectWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: -1em 0 2em 0;
	width: 30%;
	max-width: 25em;
	min-width: 15em;
`;

const ButtonWrapper = styled.div`
	margin-bottom: 3em;
`;
