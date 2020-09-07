import React from "react";
import Row from "../styled-components/Row";
import SelectElement from "../inputs/SelectElement";
import {selectCollection} from "../../actions/collectionActions";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";

type Props = {};

const EditPoemPopupCollection: React.FC<Props> = ({}) => {
	const collections = useSelector((state: RootState) => state.collectionReducer.collections);
	const collectionSelected = useSelector(
		(state: RootState) => state.collectionReducer.collectionSelected
	);

	const dispatch = useDispatch();

	const handleSelectCollection = (
		e: React.ChangeEvent<HTMLSelectElement>
	): ReturnType<typeof selectCollection> =>
		selectCollection(collections.filter(x => x.name === e.target.value)[0]);

	return (
		<>
			<Row>
				<p style={{margin: 0}}>Edit Collection</p>
				<div>
					<SelectElement
						onChangeHandle={(e: React.ChangeEvent<HTMLSelectElement>) =>
							dispatch(handleSelectCollection(e))
						}
						selectedCollection={
							collectionSelected ? collectionSelected.name : "My Collection"
						}
						isSocialFeedSelectable={false}
						collections={collections}
					/>
				</div>
			</Row>
		</>
	);
};

export default EditPoemPopupCollection;
