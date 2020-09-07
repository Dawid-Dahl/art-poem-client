import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../store";
import {renderSocialFeed} from "../actions/syncPoemAction";

export const useOutsideCollectionClicker = () => {
	const collectionSelected = useSelector(
		(state: RootState) => state.collectionReducer.collectionSelected
	);
	const cachedPoems = useSelector((state: RootState) => state.asyncPoemReducer.cachedPoems);
	const renderedPoems = useSelector((state: RootState) => state.syncPoemReducer.renderedPoems);
	const dispatch = useDispatch();

	useEffect(() => {
		const handleClickOutside = (e: any) => {
			if (collectionSelected) {
				const targetCollectionId = e.target.getAttribute("data-collection-id");
				const targetArtPoemId = e.target.getAttribute("data-artpoem-id");

				if (
					targetCollectionId === collectionSelected.id.toString() ||
					Boolean(renderedPoems.find(poem => poem.id === parseInt(targetArtPoemId)))
				) {
					return;
				}

				dispatch(renderSocialFeed(cachedPoems));
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [collectionSelected]);
};
