import React from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import ArtPoem from "./ArtPoem";
import Loading from "../Loading";
import {ReduxArtPoem} from "../../types/types";

type Props = {
	renderedPoems: ReduxArtPoem[];
};

const ArtPoemGrid: React.FC<Props> = ({renderedPoems}) => {
	const isLoading = useSelector((state: RootState) => state.loadingReducer.isLoading);

	return (
		<>
			<Wrapper>
				<Grid>
					{isLoading ? (
						<Loading />
					) : (
						renderedPoems.map(
							({
								id,
								title,
								content,
								imageUrl,
								createdAt,
								likes,
								comments,
								collections,
								userId,
								user,
							}) => (
								<ArtPoem
									key={id}
									id={id}
									title={title}
									imageUrl={imageUrl}
									content={content}
									userId={userId}
									createdAt={createdAt}
									likes={likes}
									comments={comments}
									collections={collections}
									user={user}
								/>
							)
						)
					)}
				</Grid>
			</Wrapper>
		</>
	);
};

export default ArtPoemGrid;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--light-grey-color);
	border-radius: var(--border-radius);
	width: 90%;
	margin: 0 0 3em 0;
`;

const Grid = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 2em;
	align-items: center;
	justify-content: center;
	margin: 1em 2em;

	h2 {
		color: var(--main-grey-color);
		text-align: center;
	}
`;
