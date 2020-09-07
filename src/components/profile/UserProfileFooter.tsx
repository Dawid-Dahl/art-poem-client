import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

const UserProfileFooter: React.FC = () => {
	const user = useSelector((state: RootState) => state.userReducer.user);

	return (
		<>
			<Wrapper>
				<Link to={`/account-options?id=${user?.id}`} style={{textDecoration: "none"}}>
					<p>Account Options</p>
				</Link>
			</Wrapper>
		</>
	);
};

export default UserProfileFooter;

const Wrapper = styled.div`
	display: flex;
	flex-direction: center;
	align-items: center;
	justify-content: center;
	border-top: 1px solid var(--light-grey-color);
	width: 70%;
	margin-bottom: 2em;
	padding: 2em;

	p {
		color: black;
	}
`;
