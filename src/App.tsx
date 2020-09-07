import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "./store";
import FlashMessage from "./components/FlashMessage";
import {AuthenticatedApp} from "./components/authenticated-app/AuthenticatedApp";
import {UnauthenticatedApp} from "./components/unauthenticated-app/UnauthenticatedApp";
import {Overlay} from "./components/Overlay";
import {hidePopup} from "./actions/popupActions";
import {checkIfLoggedIn} from "./actions/loginActions";
import Popup from "./components/popup/Popup";

const App: React.FC = () => {
	const isLoggedIn = useSelector((state: RootState) => state.loginReducer.isLoggedIn);
	const addCollectionPopup = useSelector(
		(state: RootState) => state.popupReducer.addCollectionPopup
	);

	const editPoemPopup = useSelector((state: RootState) => state.popupReducer.editPoemPopup);

	const dispatch = useDispatch();

	const handleClick = () => dispatch(hidePopup());

	useEffect(() => {
		dispatch(
			checkIfLoggedIn({
				xToken: localStorage.getItem("x-token"),
				xRefreshToken: localStorage.getItem("x-refresh-token"),
			})
		);
	}, []);

	return (
		<>
			<Overlay
				isShowingPopup={addCollectionPopup.active || editPoemPopup.active ? true : false}
				handleClick={handleClick}
			/>
			<Popup />
			<FlashMessage />
			{isLoggedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />}
		</>
	);
};

export default App;
