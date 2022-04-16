import { VFC, useState, memo } from "react";
import { Wrapper, StyledCell } from "./style";

// const cellsCollection: any[] = [];

// for (let i = 0; i < 16; i++) {
// 	cellsCollection.push({
// 		id: i + 1,
// 	});
// }

// type Props = {
// 	toggleBuyMode: () => void;
// 	handleCellClick: (id: number) => void;
// 	selectedIds: Array<number>;
// };

// const CellsArea: VFC<Props> = memo((props) => {
// 	const { toggleBuyMode, handleCellClick } = props;

// 	const handleClick = (id: number) => {
// 		toggleBuyMode();
// 		handleCellClick(id);
// 	};

// 	return (
// 		<Wrapper>
// 			{cellsCollection.map(({ id }) => (
// 				<StyledCell
// 					// style={{
// 					// }}
// 					isSelected={!!props.selectedIds.filter((e) => e === id)[0]}
// 					key={id}
// 					handleClick={() => handleClick(id)}
// 					id={id}
// 				/>
// 			))}
// 		</Wrapper>
// 	);
type Props = {
	selectedCells: number[];
	isSelectMode: boolean;
	handleSelectCellClick: (id: number) => void;
	toggleBuyMode: () => void;
	handleCellClick: (locationZ: number, id: number) => void;
	activeAreaCollection: any[];
};

const CellsArea: VFC<Props> = memo((props) => {
	const {
		selectedCells,
		isSelectMode,
		handleSelectCellClick,
		activeAreaCollection,
		toggleBuyMode,
		handleCellClick,
	} = props;

	// const [isCellSelected, setIsCellSelected] = useState<boolean>(false);

	const handleClick = (locationZ: number, id: number) => {
		if (!isSelectMode) {
			toggleBuyMode();
			handleCellClick(locationZ, id);
		}

		handleSelectCellClick(id);

		const isExist = selectedCells.includes(id);

		// if (isExist) {
		//   selectedCells.filter((cellId) => cellId !== id);
		// }
	};

	return (
		<Wrapper isSelectMode={isSelectMode}>
			{activeAreaCollection.map((cell, idx) => {
				return (
					<StyledCell
						key={cell.id}
						// isCellSelected={isCellSelected}
						handleClick={() => handleClick(idx + 1, cell.id)}
						id={idx + 1}
					/>
				);
			})}
		</Wrapper>
	);
});

export default CellsArea;
