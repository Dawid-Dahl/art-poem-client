import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../store";
import {disableArtMode} from "../actions/fullscreenActions";

export const useDisableArtViewerClicker = () => {
	const artMode = useSelector((state: RootState) => state.fullscreenReducer.artMode);
	const dispatch = useDispatch();

	useEffect(() => {
		const handleClickOutside = (e: any) => {
			if (
				artMode &&
				!Array.from(e.target.classList).includes("art-viewer-section") &&
				!Array.from(e.target.classList).includes("likes-section")
			) {
				dispatch(disableArtMode());
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [artMode]);
};
