import React from "react";
import Row from "../styled-components/Row";
import TextAreaInput from "../inputs/TextAreaInput";

type Props = {
	poemContent: string;
	setPoemContent: React.Dispatch<React.SetStateAction<string>>;
};

const EditPoemPopupContent: React.FC<Props> = ({poemContent, setPoemContent}) => {
	return (
		<>
			<Row>
				<p>Edit ArtPoem</p>
				<div>
					<TextAreaInput
						value={poemContent}
						onChangeHandle={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
							setPoemContent(e.target.value)
						}
						required
					/>
				</div>
			</Row>
		</>
	);
};

export default EditPoemPopupContent;
