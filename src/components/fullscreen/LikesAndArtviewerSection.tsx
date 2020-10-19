import React from "react";
import styled from "styled-components";
import LikesSection from "./LikesSection";
import ArtViewerSection from "./ArtViewerSection";

type Props = {
	poemId: number;
};

const LikesAndArtviewerSection: React.FC<Props> = ({poemId}) => {
	return (
		<>
			<Wrapper>
				<LikesSection />
				<ArtViewerSection poemId={poemId} />
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
