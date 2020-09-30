import React from "react";
import styled from "styled-components";
import LikesSection from "./LikesSection";
import ArtViewerSection from "./ArtViewerSection";

type Props = {};

const LikesAndArtviewerSection: React.FC<Props> = () => {
	return (
		<>
			<Wrapper>
				<LikesSection />
				<ArtViewerSection />
			</Wrapper>
		</>
	);
};

export default LikesAndArtviewerSection;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 7em;
`;
