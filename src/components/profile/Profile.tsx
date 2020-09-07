import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import Navbar from "../Navbar";
import {useQuery} from "../../custom-hooks/useQuery";
import {isUserProfile} from "../../utils/utils";
import UserProfile from "./UserProfile";
import GeneralProfile from "./GeneralProfile";

const Profile: React.FC = () => {
	const query = useQuery();

	const userId = query.get("id");

	const user = useSelector((state: RootState) => state.userReducer.user);

	return (
		<>
			<Navbar />
			{isUserProfile(userId, user?.id) ? <UserProfile /> : <GeneralProfile />}
		</>
	);
};

export default Profile;
