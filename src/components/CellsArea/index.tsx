import { VFC, useState, memo } from "react";
import { Wrapper, StyledCell } from "./style";

type Props = {
	selectedCells: number[];
	isSelectMode: boolean;
	handleSelectCellClick: (id: number) => void;
	toggleBuyMode: () => void;
	handleCellClick: (locationZ: number, id: number) => void;
	activeAreaCollection: any[];
	setnftIdfun: any;
	nftId: number[];
	removeSelectCellItem: any;
	currentCells: any[];
	setIsCellInfoShowed: (isShowed: boolean) => void;
	onMouseOver: any;
};

const CellsArea: VFC<Props> = memo((props) => {
	const {
		selectedCells,
		isSelectMode,
		handleSelectCellClick,
		activeAreaCollection,
		toggleBuyMode,
		handleCellClick,
		setnftIdfun,
		removeSelectCellItem,
		nftId,
		currentCells,
		setIsCellInfoShowed,
		onMouseOver,
	} = props;

	// const [isCellSelected, setIsCellSelected] = useState<boolean>(false);

	const handleClick = (locationZ: number, id: number, isNotActive: boolean) => {
		if (!isSelectMode) {
			// TODO create modal for BUY
			// toggleBuyMode();
			handleCellClick(locationZ, id);
			setIsCellInfoShowed(true);
		} else {
			const isExist = selectedCells.includes(id);

			if (!isExist && !isNotActive) {
				handleSelectCellClick(id);
			} else {
				removeSelectCellItem(id);
			}
		}
	};

	const currentMintedCells = currentCells.filter(
		(cell) => cell.Status === "Minted"
	);

	const currentReservedCells = currentCells.filter(
		(cell) => cell.Status === "Reserved"
	);

	const currentReservedCellsasf = currentCells.filter(
		(cell) => cell.Status === "Payed"
	);

	return (
		<Wrapper
			isSelectMode={isSelectMode}
			onMouseOut={() => {
				setnftIdfun([nftId[0], nftId[1], 0]);
				onMouseOver(0);
			}}
			onMouseEnter={() => {
				setnftIdfun([nftId[0], nftId[1], 0]);
			}}
			onMouseOver={() => onMouseOver(1)}>
			{currentCells &&
				currentCells.map((cell, idx) => {
					return (
						<StyledCell
							isSelectMode={isSelectMode}
							key={cell.ID}
							isCellSelected={false}
							handleClick={(isNotActive: boolean) => {
								handleClick(idx + 1, cell.ID, isNotActive);
							}}
							cellId={cell.ID}
							id={idx + 1}
							selectedCells={selectedCells}
							onMouseOver={() => setnftIdfun([nftId[0], nftId[1], idx + 1])}
							currentMintedCells={currentMintedCells}
							currentReservedCells={currentReservedCells}
							currentReservedCellsasf={currentReservedCellsasf}
						/>
					);
				})}
		</Wrapper>
	);
});

export default CellsArea;
