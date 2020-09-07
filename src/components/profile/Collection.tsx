import React from "react";
import styled from "styled-components";
import {ReduxCollection} from "../../types/types";
import {selectCollection, deleteCollection} from "../../actions/collectionActions";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {useOutsideCollectionClicker} from "../../custom-hooks/useOutsideCollectionClicker";

type Props = {
	id: ReduxCollection["id"];
	name: ReduxCollection["name"];
	onClickHandler: (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		id: ReduxCollection["id"]
	) => ReturnType<typeof selectCollection> | undefined;
};

const handleRemoveClick = (
	e: React.MouseEvent<HTMLSpanElement>,
	id: ReduxCollection["id"]
): ReturnType<typeof deleteCollection> | undefined =>
	e.target === e.currentTarget ? deleteCollection(id) : undefined;

const Collection: React.FC<Props> = ({id, name, onClickHandler}) => {
	const dispatch = useDispatch();
	const collectionSelected = useSelector(
		(state: RootState) => state.collectionReducer.collectionSelected
	);

	useOutsideCollectionClicker();

	return (
		<>
			<Wrapper collectionId={id} collectionSelected={collectionSelected}>
				<SpanWrapper data-collection-id={id} onClick={e => onClickHandler(e, id)}>
					<span
						onClick={e =>
							confirm(
								"Are you sure you want to delete this collection? Any associated Artpoems will be deleted as well!"
							) && dispatch(handleRemoveClick(e, id))
						}
					>
						❌
					</span>
				</SpanWrapper>
				<CollectionTitle>{name}</CollectionTitle>
			</Wrapper>
		</>
	);
};

export default Collection;

type WrapperProps = {
	collectionId: ReduxCollection["id"];
	collectionSelected?: ReduxCollection | null;
};

const Wrapper = styled.div<WrapperProps>`
	display: flex;
	position: relative;
	align-items: center;
	justify-content: center;
	height: 150px;
	flex: 1 1 150px;
	border-radius: var(--border-radius);
	background-color: ${({collectionSelected, collectionId}) =>
		collectionSelected && collectionSelected.id === collectionId
			? "var(--main-grey-color)"
			: "white"};
	padding: 1em;
	margin: 1em 2em;
	text-align: center;
	box-shadow: var(--box-shadow);
	cursor: pointer;
	transition: all 0.2s;
	overflow: hidden;

	:hover {
		transform: scale(1.01) rotate(1deg);
	}
`;

const SpanWrapper = styled.div`
	position: absolute;
	height: 100%;
	width: 100%;
	text-align: right;
	transition: all 1s;

	&:hover {
		span {
			opacity: 80%;
		}
	}

	span {
		position: absolute;
		display: block;
		opacity: 0%;
		top: 5%;
		right: 5%;
		transition: all 0.3s;
		z-index: 10;

		&:hover {
			transform: scale(1.1);
		}
	}
`;

const CollectionTitle = styled.h1``;
