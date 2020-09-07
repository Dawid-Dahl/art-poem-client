import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {ReduxArtPoem} from "../../types/types";
import {countLikes} from "../fullscreen/LikesSection";

const ArtPoem: React.FC<ReduxArtPoem> = ({id, title, likes, imageUrl}) => {
	return (
		<>
			<Wrapper>
				<Link to={`/fullscreen?id=${id}`}>
					<StyledDiv data-artpoem-id={id} imageUrl={imageUrl}>
						<ArtPoemTitle data-artpoem-id={id}>{title}</ArtPoemTitle>
						<ArtPoemLikes data-artpoem-id={id}>{`👍🏻 ${countLikes(
							likes
						)}`}</ArtPoemLikes>
					</StyledDiv>
				</Link>
			</Wrapper>
		</>
	);
};

export default ArtPoem;

const Wrapper = styled.div`
	a {
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		width: 100%;
	}
`;

type Props = {
	imageUrl: string;
};

const StyledDiv = styled.div<Props>`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background-image: ${props => `url(${props.imageUrl})`};
	background-size: cover;
	background-position: center;
	border-radius: var(--border-radius);
	height: 300px;
	width: 100%;
	background-color: lightgray;
	overflow: hidden;
	box-shadow: var(--box-shadow);
	transition: transform 0.3s;

	:hover {
		transform: scale(1.01) rotate(1deg);
	}

	@media only screen and (max-width: 805px) {
		width: 100%;
	}
`;

const ArtPoemTitle = styled.h1`
	color: white;
	max-width: 200px;
	padding: 5px;
	border-radius: 5px;
	background-color: #00000029;
	text-align: center;
`;

const ArtPoemLikes = styled.h1`
	color: white;
	padding: 5px;
	border-radius: 5px;
	background-color: #0000005c;
`;
