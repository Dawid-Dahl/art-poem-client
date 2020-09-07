import React from "react";
import Row from "../styled-components/Row";
import FileInput from "../inputs/FileInput";
import {ImageFile} from "../../types/types";

type Props = {
	imageFile: ImageFile;
	setImageFile: React.Dispatch<React.SetStateAction<ImageFile>>;
};

const EditPoemPopupArt: React.FC<Props> = ({imageFile, setImageFile}) => {
	const onChangeHandle = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setImageFile(event.target.files?.[0]);
	};

	return (
		<>
			<Row>
				<p>Update Art</p>
				<div>
					<FileInput
						name="popupImageFile"
						kind="grey"
						isFileSelected={Boolean(imageFile)}
						onChangeHandle={onChangeHandle}
					/>
				</div>
			</Row>
		</>
	);
};

export default EditPoemPopupArt;
