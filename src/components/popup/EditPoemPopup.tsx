import React, {useState, useEffect} from "react";
import styled, {css} from "styled-components";
import Button from "../Button";
import {useDispatch, useSelector} from "react-redux";
import {hidePopup} from "../../actions/popupActions";
import {RootState} from "../../store";
import {editPoem, deletePoem} from "../../actions/asyncPoemActions";
import {ImageFile} from "../../types/types";
import {selectCollection, getAllCollections} from "../../actions/collectionActions";
import EditPoemPopupTitle from "./EditPoemPopupTitle";
import EditPoemPopupArt from "./EditPoemPopupArt";
import EditPoemPopupCollection from "./EditPoemPopupCollection";
import EditPoemPopupContent from "./EditPoemPopupContent";

type Props = {};

const EditPoemPopup: React.FC<Props> = () => {
	const poemSelected = useSelector((state: RootState) => state.syncPoemReducer.poemSelected);
	const editPoemPopup = useSelector((state: RootState) => state.popupReducer.editPoemPopup);
	const collectionSelected = useSelector(
		(state: RootState) => state.collectionReducer.collectionSelected
	);

	useEffect(() => {
		setPoemTitle(poemSelected.title);
		setPoemContent(poemSelected.content);
		dispatch(selectCollection(poemSelected.collections[0]));
	}, [poemSelected]);

	useEffect(() => {
		dispatch(getAllCollections());
	}, []);

	const [poemTitle, setPoemTitle] = useState(poemSelected.title);
	const [imageFile, setImageFile] = useState<ImageFile>(null);
	const [poemContent, setPoemContent] = useState(poemSelected.content);

	const dispatch = useDispatch();

	const turnFormStateIntoObj = (
		poemId: number,
		poemTitle: string,
		imageFile: ImageFile,
		poemCollectionId: number,
		poemContent: string
	): FormData => {
		const data = new FormData();
		if (imageFile) data.append("editImageFile", imageFile);
		data.append(
			"editPoemFields",
			JSON.stringify({poemId, poemTitle, poemCollectionId, poemContent})
		);
		return data;
	};

	const handleCancelClick = () => {
		setPoemTitle(poemSelected.title);
		setImageFile(null);
		setPoemContent(poemSelected.content);
		dispatch(selectCollection(poemSelected.collections[0]));
		dispatch(hidePopup());
	};

	const handleDeleteClick = () => {
		const isConfirmingDeletion = confirm("Are you sure you want to delete this Artpoem?");
		if (isConfirmingDeletion) dispatch(deletePoem(poemSelected.id));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();

			if (!collectionSelected) {
				console.error("A collection need to be selected");
				return;
			}

			const editPoemPayload = turnFormStateIntoObj(
				poemSelected.id,
				poemTitle,
				imageFile,
				collectionSelected.id,
				poemContent
			);

			if (!editPoemPayload) return;

			dispatch(editPoem(editPoemPayload));

			setPoemTitle(poemSelected.title);
			setImageFile(null);
			setPoemContent(poemSelected.content);
			dispatch(hidePopup());
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			<StyledForm action="POST" onSubmit={e => handleSubmit(e)} active={editPoemPopup.active}>
				<h2>{editPoemPopup.active ? editPoemPopup.name : ""}</h2>
				<EditPoemPopupTitle poemTitle={poemTitle} setPoemTitle={setPoemTitle} />
				<EditPoemPopupArt imageFile={imageFile} setImageFile={setImageFile} />
				<EditPoemPopupCollection />
				<EditPoemPopupContent poemContent={poemContent} setPoemContent={setPoemContent} />

				<ButtonRow>
					<Button
						title="Cancel"
						kind="grey"
						type="button"
						onClickHandler={handleCancelClick}
					/>
					<Button
						title="Delete"
						kind="delete"
						type="button"
						onClickHandler={handleDeleteClick}
					/>
					<Button title="Edit" kind="primary" type="submit" />
				</ButtonRow>
			</StyledForm>
		</>
	);
};

export default EditPoemPopup;

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

const SectionWrapper = styled.div`
	margin: 0.7em;
`;

const ButtonRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
`;
