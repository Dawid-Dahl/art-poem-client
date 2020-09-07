import React from "react";
import Row from "../styled-components/Row";
import TextInput from "../inputs/TextInput";

type Props = {
	poemTitle: string;
	setPoemTitle: React.Dispatch<React.SetStateAction<string>>;
};

const EditPoemPopupTitle: React.FC<Props> = ({poemTitle, setPoemTitle}) => {
	return (
		<>
			<Row>
				<p>Edit Title</p>
				<div>
					<TextInput
						value={poemTitle}
						type="text"
						onChangeHandle={(e: React.ChangeEvent<HTMLInputElement>) =>
							setPoemTitle(e.target.value)
						}
						required
					/>
				</div>
			</Row>
		</>
	);
};

export default EditPoemPopupTitle;
