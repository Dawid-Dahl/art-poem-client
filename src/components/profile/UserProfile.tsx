import React, {useEffect} from "react";
import styled from "styled-components";
import ProfilePic from "./ProfilePic";
import CollectionsDisplay from "./CollectionsDisplay";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../store";
import ArtPoemGrid from "../art-poem-grid/ArtPoemGrid";
import {getPoemsByUserId} from "../../actions/asyncPoemActions";
import Button from "../Button";
import {getPoemsByUserAndCollection, renderSocialFeed} from "../../actions/syncPoemAction";
import {getAllCollections} from "../../actions/collectionActions";
import UserProfileFooter from "./UserProfileFooter";

const UserProfile: React.FC = () => {
	const user = useSelector((state: RootState) => state.userReducer.user);
	const cachedPoems = useSelector((state: RootState) => state.asyncPoemReducer.cachedPoems);
	const collections = useSelector((state: RootState) => state.collectionReducer.collections);
	const collectionSelected = useSelector(
		(state: RootState) => state.collectionReducer.collectionSelected
	);
	const renderedPoems = useSelector((state: RootState) => state.syncPoemReducer.renderedPoems);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllCollections());
	}, []);

	useEffect(() => {
		if (user) dispatch(getPoemsByUserId(user.id));
	}, []);

	useEffect(() => {
		collectionSelected &&
			user &&
			dispatch(getPoemsByUserAndCollection(cachedPoems, collectionSelected, user));
	}, [collectionSelected]);

	const handleClick = () => {
		dispatch(renderSocialFeed(cachedPoems));
	};

	return (
		<>
			<Wrapper>
				<Greeting>{`Welcome back, ${user?.username ?? ""}!`}</Greeting>
				<ProfilePicWrapper>
					<ProfilePic size={8} isAnimating isPictureChangeable user={user} />
				</ProfilePicWrapper>
				<h2>Your Collections</h2>
				<CollectionsDisplay collections={collections} />
				<h2>Your ArtPoems</h2>
				{collectionSelected && (
					<Button
						title="View All"
						kind="grey"
						type="button"
						onClickHandler={handleClick}
					/>
				)}
				<ArtPoemGrid renderedPoems={renderedPoems} />
				<UserProfileFooter />
			</Wrapper>
		</>
	);
};

export default UserProfile;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	h2 {
		margin: 1.5em;
	}
`;

const ProfilePicWrapper = styled.div`
	margin: 1.5em 0 0 0;
`;

const Greeting = styled.h1`
	margin: 5em 0 0.5em 0;
	text-align: center;
`;
