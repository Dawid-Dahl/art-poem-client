import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import Navbar from "../Navbar";
import {useQuery} from "../../custom-hooks/useQuery";
import styled from "styled-components";
import OptionsComponent from "./OptionsComponent";
import ProfilePic from "../profile/ProfilePic";
import {isUserProfile} from "../../utils/utils";

const AccountOptions: React.FC = () => {
	const query = useQuery();

	const userId = query.get("id");

	const user = useSelector((state: RootState) => state.userReducer.user);

	return (
		<>
			<Navbar />
			{isUserProfile(userId, user?.id) && (
				<Wrapper>
					<h1>Account Options</h1>
					<ProfilePicWrapper>
						<ProfilePic size={8} user={user} />
					</ProfilePicWrapper>
					<OptionsComponent />
				</Wrapper>
			)}
		</>
	);
};

export default AccountOptions;

const Wrapper = styled.div`
	display: flex;
	flex-direction: center;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	h1 {
		margin: 5em 0 1em 0;
		text-align: center;
	}
`;

const ProfilePicWrapper = styled.div`
	margin: 0 0 3em 0;
`;
