import React, {useEffect, Dispatch} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {ReduxLike, User, ReduxArtPoem} from "../../types/types";
import {enableHasUserLikedPoem, likePoem, unlikePoem} from "../../actions/likeActions";

type Props = {};

export const countLikes = (likes: ReduxLike[]): number => likes.length;

const hasUserLiked = (user: User, likes: ReduxLike[]): boolean =>
	Boolean(likes.find(like => like.userId === user.id));

const getUserLike = (user: User | null, likes: ReduxLike[]): ReduxLike | undefined =>
	user ? likes.find(like => like.userId === user.id) : undefined;

const LikesSection: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.userReducer.user);
	const hasUserLikedPoem = useSelector((state: RootState) => state.likeReducer.hasUserLikedPoem);
	const poemSelected = useSelector((state: RootState) => state.syncPoemReducer.poemSelected);

	useEffect(() => {
		if (!user) return;
		if (!poemSelected.likes) return;

		if (hasUserLiked(user, poemSelected.likes)) dispatch(enableHasUserLikedPoem());
	}, [poemSelected]);

	const handleLikeClick = (
		e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
		dispatch: Dispatch<any>
	) => (user: User | null, poemSelected: ReduxArtPoem) => (
		hasUserLikedPoem: boolean,
		getUserLike: (user: User | null, likes: ReduxLike[]) => ReduxLike | undefined
	) => {
		if (hasUserLikedPoem) {
			const userLike = getUserLike(user, poemSelected.likes);
			if (!userLike) return;

			dispatch(unlikePoem(userLike.id, poemSelected.id));
		} else {
			dispatch(likePoem(poemSelected.id));
		}
	};

	return (
		<>
			<Wrapper>
				<LikeIcon
					onClick={e =>
						handleLikeClick(e, dispatch)(user, poemSelected)(
							hasUserLikedPoem,
							getUserLike
						)
					}
					hasUserLikedPoem={hasUserLikedPoem}
				>
					👍🏻
				</LikeIcon>
				<LikeCounter
					onClick={e =>
						handleLikeClick(e, dispatch)(user, poemSelected)(
							hasUserLikedPoem,
							getUserLike
						)
					}
				>
					{`${countLikes(poemSelected.likes)}`}{" "}
				</LikeCounter>
			</Wrapper>
		</>
	);
};

export default LikesSection;

const Wrapper = styled.div`
	text-align: center;
	margin: 0 0 1em 0;
	background-color: white;
	box-shadow: var(--box-shadow);
	border-radius: 5px;
	height: fit-content;
	padding: 50px;

	p {
		text-align: center;
		font-size: 2em;
	}

	@media only screen and (max-width: 1280px) {
		padding: 30px;
	}

	@media only screen and (max-width: 800px) {
	}
`;

type LikeIconProps = {
	hasUserLikedPoem: boolean;
};

const LikeIcon = styled.p<LikeIconProps>`
	background-color: ${props =>
		props.hasUserLikedPoem ? "var(--main-btn-color)" : "transparent"};
	border-radius: 5px;
	margin: 0.3em;
	padding: 0.2em;
	cursor: pointer;
	display: inline;
`;

const LikeCounter = styled.p`
	margin: 0.3em;
	cursor: pointer;
	display: inline;
`;
