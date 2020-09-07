import React, {useState} from "react";
import styled, {css} from "styled-components";
import TextInput from "../inputs/TextInput";
import Button from "../Button";
import CheckBoxInput from "../inputs/CheckBoxInput";
import {useDispatch, useSelector} from "react-redux";
import {hidePopup} from "../../actions/popupActions";
import {RootState} from "../../store";
import {addCollection} from "../../actions/collectionActions";
import {AddCollectionFormObject} from "../../types/types";

const AddCollectionPopup: React.FC = () => {
	const [collectionName, setCollectionName] = useState("");
	const [isPublic, setisPublic] = useState(true);

	const dispatch = useDispatch();

	const addCollectionPopup = useSelector(
		(state: RootState) => state.popupReducer.addCollectionPopup
	);

	const turnFormStateIntoObj = (
		collectionName: string,
		isPublic: boolean
	): AddCollectionFormObject | undefined => {
		if (collectionName) {
			return {
				collectionName,
				isPublic,
			};
		} else {
			console.log("No data sent. Fill in all the required fields.");
			return;
		}
	};

	const handleClick = () => {
		setCollectionName("");
		dispatch(hidePopup());
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();

			const collectionPayload = turnFormStateIntoObj(collectionName, isPublic);

			if (!collectionPayload) return;

			dispatch(addCollection(collectionPayload));

			setCollectionName("");
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			<StyledForm
				action="POST"
				onSubmit={e => handleSubmit(e)}
				active={addCollectionPopup.active}
			>
				<h2>{addCollectionPopup.active ? addCollectionPopup.name : ""}</h2>
				<NameRow>
					<p>Name</p>
					<div>
						<TextInput
							name="Enter Name"
							value={collectionName}
							type="text"
							onChangeHandle={(e: React.ChangeEvent<HTMLInputElement>) =>
								setCollectionName(e.target.value)
							}
							required
						/>
					</div>
				</NameRow>
				<PublicRow>
					<p>Public</p>
					<CheckBoxInput
						name="public"
						isChecked={isPublic}
						checked
						onChangeHandle={(e: React.ChangeEvent<HTMLInputElement>) =>
							setisPublic(e.target.checked)
						}
					/>
				</PublicRow>
				<ButtonRow>
					<Button title="Cancel" kind="grey" type="button" onClickHandler={handleClick} />
					<Button title="Add" kind="primary" type="submit" />
				</ButtonRow>
			</StyledForm>
		</>
	);
};

export default AddCollectionPopup;

type StyledFormProps = {
	active: boolean;
};

const StyledForm = styled.form<StyledFormProps>`
	min-width: 30%;
	position: fixed;
	padding: 2em;
	background-color: white;
	border-radius: var(--border-radius);
	box-shadow: 1px 0px 20px 6px #00000045;
	z-index: 20;

	h2 {
		text-align: center;
		color: black;
	}

	p {
		color: black;
	}

	${props =>
		props.active
			? css`
					display: block;
			  `
			: css`
					display: none;
			  `}

	@media only screen and (max-width: 500px) {
		width: 100%;
		border-radius: 0;
		align-self: stretch;
	}
`;

const NameRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 2em;
	padding: 2em 0 1em 0;
	border-top: 1px var(--light-grey-color) solid;

	p {
		padding-right: 30px;
		width: 20%;
	}

	div {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	input {
		border: var(--light-grey-color) 2px solid;
		outline: none;

		&:focus {
			box-shadow: 0 0 0 2pt var(--main-btn-color);
		}
	}

	@media only screen and (max-width: 500px) {
		margin: 2em;

		input {
			width: 50%;
			margin: 0;
		}
	}
`;

const PublicRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: start;
	margin: 1em 0em;
	padding: 1em 0em;
	border-top: 1px var(--light-grey-color) solid;

	p {
		padding-right: 30px;
		width: 20%;
	}

	input {
		margin: 0;
	}

	@media only screen and (max-width: 500px) {
		margin: 2em;
	}
`;

const ButtonRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
`;
