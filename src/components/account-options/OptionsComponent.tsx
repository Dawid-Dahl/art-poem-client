import React, {Dispatch} from "react";
import {useDispatch} from "react-redux";
import styled from "styled-components";
import {deleteUserAccountAndData} from "../../actions/userActions";

const OptionsComponent: React.FC = () => {
	const dispatch = useDispatch();

	const handleRemoveUserAccount = (dispatch: Dispatch<any>) => {
		confirm(
			"Are you sure you want to delete your account? All associated data will be deleted as well."
		) && dispatch(deleteUserAccountAndData());
	};

	return (
		<>
			<Wrapper>
				<h3 onClick={e => handleRemoveUserAccount(dispatch)}>Remove My Account</h3>
			</Wrapper>
		</>
	);
};

export default OptionsComponent;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex-wrap: wrap;
	background-color: var(--light-grey-color);
	width: 70%;
	border-radius: var(--border-radius);

	h3 {
		margin-right: 2em;
		text-align: center;
		cursor: pointer;

		&:hover {
			text-decoration: underline;
		}
	}

	@media only screen and (min-width: 1280px) {
		width: 50%;
	}

	@media only screen and (max-width: 500px) {
		justify-content: center;
		width: 90%;

		h3 {
			margin-right: 0em;
		}
	}
`;
