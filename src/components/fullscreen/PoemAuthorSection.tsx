import React from "react";
import styled from "styled-components";
import {RootState} from "../../store";
import {useSelector} from "react-redux";
import ProfilePic from "../profile/ProfilePic";
import {Link} from "react-router-dom";

type Props = {};

const PoemAuthorSection: React.FC<Props> = () => {
	const selectedArtPoem = useSelector((state: RootState) => state.syncPoemReducer.poemSelected);

	return (
		<>
			<Wrapper>
				<Link
					to={`/profile?id=${selectedArtPoem.user?.id}`}
					style={{textDecoration: "none"}}
				>
					<InnerWrapper>
						<ProfilePic size={3} user={selectedArtPoem?.user} />
						<h2>{selectedArtPoem.user?.username}</h2>
					</InnerWrapper>
				</Link>
			</Wrapper>
		</>
	);
};

export default PoemAuthorSection;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const InnerWrapper = styled.div`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: 5px;
	background-color: #00000029;
	text-align: center;
	padding: 0.2em;

	h2 {
		color: white;
		margin: 0 0.5em 0 0.5em;
		font-size: 1em;
		padding: 0;
	}
`;
