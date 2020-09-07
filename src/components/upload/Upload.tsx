import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Button from "../Button";
import TextInput from "../inputs/TextInput";
import TextAreaInput from "../inputs/TextAreaInput";
import {ImageFile} from "../../types/types";
import Navbar from "../Navbar";
import FileInput from "../inputs/FileInput";
import SelectElement from "../inputs/SelectElement";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../store";
import {getAllCollections} from "../../actions/collectionActions";
import {showFlash} from "../../actions/flashActions";
import {uploadPoem} from "../../actions/asyncPoemActions";

const Upload: React.FC = () => {
	const [title, setTitle] = useState("");
	const [collection, setCollection] = useState("My Collection");
	const [imageFile, setImageFile] = useState<ImageFile>(null);
	const [poem, setPoem] = useState("");

	const collections = useSelector((state: RootState) => state.collectionReducer.collections);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllCollections());
	}, []);

	const resetLocalState = () => {
		setTitle("");
		setCollection("My Collection");
		setImageFile(null);
		setPoem("");
	};

	const turnFormStateIntoObj = () => {
		if (!imageFile) {
			dispatch(showFlash("Please select an image to go with the poem!"));
			return;
		}

		if (!collection) {
			setCollection("My Collection");
		}

		if (title && poem) {
			const data = new FormData();
			data.append("imageFile", imageFile);
			data.append("poemFields", JSON.stringify({title, collection, poem}));

			return data;
		} else {
			console.log("No data sent. Fill in all the required fields.");
			return;
		}
	};

	const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setImageFile(e.target.files?.[0]);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();

			const uploadPayload = turnFormStateIntoObj();

			if (!uploadPayload) return;

			dispatch(uploadPoem(uploadPayload));

			resetLocalState();
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			<Navbar />
			<Wrapper>
				<h1 className="registration">Let's Upload!</h1>
				<StyledForm
					action="POST"
					className="form"
					encType="multipart/form-data"
					onSubmit={e => {
						e.persist();
						handleSubmit(e);
						e.currentTarget.reset();
					}}
				>
					<TextInputWrapper>
						<TextInput
							name="title"
							value={title}
							type="text"
							onChangeHandle={(e: React.ChangeEvent<HTMLInputElement>) =>
								setTitle(e.target.value)
							}
							required
						/>
					</TextInputWrapper>
					<SelectWrapper>
						<SelectElement
							onChangeHandle={(e: React.ChangeEvent<HTMLSelectElement>) =>
								setCollection(e.target.value)
							}
							selectedCollection={collection}
							collections={collections}
						/>
					</SelectWrapper>
					<FileInputWrapper>
						<FileInput
							name="uploadImageFile"
							kind="white"
							isFileSelected={Boolean(imageFile)}
							onChangeHandle={onChangeHandle}
						/>
					</FileInputWrapper>
					<TextAreaInputWrapper>
						<TextAreaInput
							name="poem"
							value={poem}
							onChangeHandle={(event: React.ChangeEvent<HTMLTextAreaElement>): void =>
								setPoem(event.target.value)
							}
							required
						/>
					</TextAreaInputWrapper>
					<Button title="Upload" kind="primary" type="submit" />
				</StyledForm>
			</Wrapper>
		</>
	);
};

export default Upload;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	top: 7em;
	position: absolute;
	width: 100%;

	h1 {
		letter-spacing: 1px;
		margin-top: 1em;
		text-align: center;
	}
`;

const TextInputWrapper = styled.div`
	width: 30%;
	max-width: 25em;
	min-width: 15em;
	margin: 0.7em 0;
`;

const SelectWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0.7em 0;
	width: 30%;
	max-width: 25em;
	min-width: 15em;
`;

const FileInputWrapper = styled.div`
	margin: 0.7em 0;
`;
const TextAreaInputWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0.7em 0;
	width: 30%;
	max-width: 25em;
	min-width: 15em;
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	margin: 1em 0;
	padding: 1em 0;
	background-color: black;

	h2 {
		color: white;
	}
`;
