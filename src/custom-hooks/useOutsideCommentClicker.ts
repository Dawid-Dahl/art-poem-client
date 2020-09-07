import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../store";
import {deselectComment, disableCommentEdit} from "../actions/commentActions";

export const useOutsideCommentClicker = () => {
	const commentSelected = useSelector((state: RootState) => state.commentReducer.commentSelected);
	const dispatch = useDispatch();

	useEffect(() => {
		const handleClickOutside = (e: any) => {
			if (commentSelected) {
				const targetId = e.target.getAttribute("data-comment-id");

				if (targetId === commentSelected.id.toString()) {
					return;
				}

				dispatch(deselectComment());
				dispatch(disableCommentEdit());
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [commentSelected]);
};
