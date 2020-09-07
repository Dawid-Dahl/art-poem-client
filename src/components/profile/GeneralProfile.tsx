import React, {useEffect} from "react";
import styled from "styled-components";
import ProfilePic from "./ProfilePic";
import {useDispatch, useSelector} from "react-redux";
import ArtPoemGrid from "../art-poem-grid/ArtPoemGrid";
import {getPoemsByUserId} from "../../actions/asyncPoemActions";
import {useQuery} from "../../custom-hooks/useQuery";
import {getUser} from "../../actions/userActions";
import {RootState} from "../../store";
import {filterPoemsByPublicCollection} from "../../utils/utils";

const GeneralProfile: React.FC = () => {
	const query = useQuery();

	const userId = query.get("id");

	const dispatch = useDispatch();

	const profileUser = useSelector((state: RootState) => state.profileReducer.profileUser);
	const renderedPoems = useSelector((state: RootState) => state.syncPoemReducer.renderedPoems);

	const publicPoems = filterPoemsByPublicCollection(renderedPoems);

	useEffect(() => {
		if (userId) dispatch(getUser(userId));
	}, []);

	useEffect(() => {
		if (userId) dispatch(getPoemsByUserId(userId));
	}, []);

	return (
		<>
			<Wrapper>
				<ProfilePicWrapper>
					<ProfilePic size={8} isAnimating user={profileUser} />
				</ProfilePicWrapper>
				{!profileUser ? (
					<h1 style={{color: "var(--main-grey-color)"}}>Loading...</h1>
				) : (
					<h1>{`${profileUser?.username}'s ArtPoems`} </h1>
				)}
				<ArtPoemGrid renderedPoems={publicPoems} />
			</Wrapper>
		</>
	);
};

export default GeneralProfile;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 8em 0 0.5em 0;

	h1 {
		margin: 1.5em;
		text-align: center;
	}
`;

const ProfilePicWrapper = styled.div`
	margin: 1.5em 0 0 0;
`;

const Greeting = styled.h1`
	margin: 5em 0 0.5em 0;
	text-align: center;
`;
