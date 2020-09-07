import React from "react";
import styled from "styled-components";

type Props = {
	name: string;
	isFileSelected: boolean;
	onChangeHandle: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ProfilePictureInput: React.FC<Props> = ({name, isFileSelected, onChangeHandle}) => {
	return (
		<StyledProfilePictureInput id={name} onChange={onChangeHandle} name={name} type="file" />
	);
};

export default ProfilePictureInput;

const StyledProfilePictureInput = styled.input`
	height: 100%;
	width: 100%;
	opacity: 0%;
	font-size: 0;
	cursor: pointer;
	position: absolute;
`;
