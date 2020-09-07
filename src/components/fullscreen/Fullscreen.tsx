import React from "react";
import styled from "styled-components";
import Navbar from "../Navbar";
import FullscreenSection from "./FullscreenSection";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import Loading from "../Loading";

const Fullscreen: React.FC = () => {
	const isLoading = useSelector((state: RootState) => state.loadingReducer.isLoading);

	return (
		<>
			<Wrapper>
				<Navbar />
				{isLoading ? <Loading /> : <FullscreenSection />}
			</Wrapper>
		</>
	);
};

export default Fullscreen;

const Wrapper = styled.div`
	position: absolute;
	top: 7em;
	width: 100%;
`;
