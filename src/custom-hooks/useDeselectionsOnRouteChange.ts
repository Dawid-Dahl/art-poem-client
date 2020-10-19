import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {RootState} from "../store";
import {deselectCollection} from "../actions/collectionActions";
import {deselectPoem} from "../actions/syncPoemAction";
import {
	closeCommentSubmitSection,
	disableCommentEdit,
	deselectComment,
} from "../actions/commentActions";
import {disableHasUserLikedPoem} from "../actions/likeActions";
import {unsetProfileName} from "../actions/profileActions";

export const useDeselectionsOnRouteChange = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const collectionsSelected = useSelector(
		(state: RootState) => state.collectionReducer.collectionSelected
	);
	const poemSelected = useSelector((state: RootState) => state.syncPoemReducer.poemSelected);

	useEffect(() => {
		const unlisten = history.listen(
			() => collectionsSelected && dispatch(deselectCollection())
		);
		return () => unlisten();
	});

	useEffect(() => {
		if (poemSelected.id === 0) return;

		const unlisten = history.listen(() => poemSelected && dispatch(deselectPoem()));
		return () => unlisten();
	});

	useEffect(() => {
		const unlisten = history.listen(
			() => (
				dispatch(closeCommentSubmitSection()),
				dispatch(disableCommentEdit()),
				dispatch(deselectComment())
			)
		);
		return () => unlisten();
	});

	useEffect(() => {
		const unlisten = history.listen(() => dispatch(disableHasUserLikedPoem()));
		return () => unlisten();
	});

	useEffect(() => {
		const unlisten = history.listen(() => dispatch(unsetProfileName()));
		return () => unlisten();
	});
};
