import { VFC } from "react";
import { Wrapper, CellIdLabel } from "./style";

type Props = {
	className?: string;
	handleClick: (isNotActive: boolean) => void;
	id: number;
	onMouseOver: any;
	onMouseOut?: any;
	selectedCells: any;
	cellId: number;
	currentMintedCells: any[];
	currentReservedCells: any[];
	isSelectMode: boolean;
	currentReservedCellsasf: any;
};

const Cell: VFC<Props> = (props) => {
	const {
		handleClick,
		id,
		cellId,
		className,
		onMouseOver,
		onMouseOut,
		selectedCells,
		currentMintedCells,
		currentReservedCells,
		currentReservedCellsasf,
		isSelectMode,
	} = props;

	const isMinted = currentMintedCells.filter((e: any) => e.ID === cellId)[0];
	const isReserved = currentReservedCells.filter(
		(e: any) => e.ID === cellId
	)[0];
	const isPayed = currentReservedCellsasf.filter(
		(e: any) => e.ID === cellId
	)[0];

	const isNotActive = isMinted || isReserved;

	return (
		<Wrapper
			className={className}
			onClick={() => {
				handleClick(isNotActive);
			}}
			onMouseOver={onMouseOver}
			onMouseOut={onMouseOut}
			selected={!!selectedCells.filter((e: number) => e === cellId)[0]}
			minted={isMinted}
			reserved={isReserved}
			payed={isPayed}
			isNotActive={isSelectMode && isNotActive}>
			<CellIdLabel>#{cellId}</CellIdLabel>
		</Wrapper>
	);
};

export default Cell;
