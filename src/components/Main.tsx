import React, {useEffect} from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import ArtPoemGrid from "./art-poem-grid/ArtPoemGrid";
import {getAllCollections} from "../actions/collectionActions";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../store";
import {getPoems} from "../actions/asyncPoemActions";
import {getPoemsByUserAndCollection} from "../actions/syncPoemAction";
import {filterPoemsByPublicCollection, pipe, scrambleArray, take} from "../utils/utils";
import Button from "./Button";

const Main = () => {
	const cachedPoems = useSelector((state: RootState) => state.asyncPoemReducer.cachedPoems);
	const user = useSelector((state: RootState) => state.userReducer.user);
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
		dispatch(dispatch(getPoems(20)));
	}, []);

	return (
		<Wrapper>
			<Navbar />
			<InnerWrapper>
				{collectionSelected ? <h1></h1> : <h1>Discover</h1>}
				<ArtPoemGrid
					renderedPoems={pipe(
						filterPoemsByPublicCollection,
						scrambleArray,
						take(12)
					)(renderedPoems)}
				/>
				<ButtonWrapper>
					{cachedPoems.length >= 12 && (
						<Button
							title="Refresh ArtPoems"
							kind="grey"
							type="button"
							onClickHandler={() => dispatch(getPoems(20))}
						/>
					)}
				</ButtonWrapper>
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
		margin: 1em 0 1.5em 0;
	}
`;

const ButtonWrapper = styled.div`
	margin-bottom: 3em;
`;
