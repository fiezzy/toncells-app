import { VFC, useState, useCallback, useEffect } from "react";
import { Modal } from "../Modal";
import CellsArea from "../CellsArea";
import { CLOSE_ICON } from "../../constants/images";
import { CloseOutlined } from "@ant-design/icons";

import {
	// 	Wrapper,
	// 	LabelId,
	// 	CloseBtn,
	// 	FlexWrapper,
	// 	InfoBlock,
	// 	InfoLabel,
	// 	InfoText,
	// 	BuyButton,
	// } from "./style";

	// type Props = {
	// 	isVisible: boolean;
	// 	onClose: () => void;
	// 	id: number;
	// 	locationX: number;
	// 	locationY: number;
	// 	firstCellId: number;
	// 	lastCellId: number;
	// 	toggleBuyMode: () => void;
	// 	toggleInvoiceMode: () => void;
	// 	handleCellClick: (id: number) => void;
	// 	setSelectedIds: any;
	// 	selectedIds: number[];
	// };

	// const CellModal: VFC<Props> = (props) => {
	// 	const {
	// 		isVisible,
	// 		onClose,
	// 		id,
	// 		locationX,
	// 		locationY,
	// 		firstCellId,
	// 		lastCellId,
	// 		toggleBuyMode,
	// 		handleCellClick,
	// 		toggleInvoiceMode,
	// 		selectedIds,
	// 		setSelectedIds,
	// 	} = props;

	// 	const [select, setselect] = useState(false);

	// 	const selectId = (id: number) => {
	// 		if (!!selectedIds.filter((e) => e === id)[0]) {
	// 			setSelectedIds([...selectedIds, id]);
	// 		} else {
	// 			setSelectedIds(selectedIds.filter((e) => e !== id));
	// 		}
	// 	};

	// 	return (
	// 		<Modal isVisible={isVisible} onClose={onClose}>
	// 			<Wrapper>
	// 				<CloseBtn onClick={onClose}>
	// 					<img src={CLOSE_ICON} alt="Close" />
	// 				</CloseBtn>
	// 				<LabelId>#{id}</LabelId>
	// 				<FlexWrapper>
	// 					<CellsArea
	// 						handleCellClick={(id) => {
	// 							select ? selectId(id) : handleCellClick(id);
	// 						}}
	// 						selectedIds={selectedIds}
	// 						toggleBuyMode={() => {}}
	// 					/>
	// 					<InfoBlock>
	// 						<InfoLabel>
	// 							CELLS: {firstCellId} - {lastCellId}
	// 						</InfoLabel>
	// 						<InfoText>
	// 							X: <span>{locationX}</span>, Y: <span>{locationY}</span>
	// 						</InfoText>
	// 					</InfoBlock>

	// 					{/* <BuyButton
	// 						onClick={() => {
	// 							setselect(true);
	// 						}}>
	// 						Select
	// 					</BuyButton> */}

	// 					<BuyButton
	// 						onClick={() => {
	// 							toggleInvoiceMode();
	// 						}}>
	// 						BUY
	// 					</BuyButton>
	// 				</FlexWrapper>
	// 			</Wrapper>
	// 		</Modal>
	// 	);
	Wrapper,
	LabelId,
	CloseBtn,
	FlexWrapper,
	InfoBlock,
	InfoLabel,
	InfoText,
	BuyFewBtn,
} from "./style";

type Props = {
	isVisible: boolean;
	onClose: () => void;
	id: number;
	locationX: number;
	locationY: number;
	firstCellId: number;
	lastCellId: number;
	toggleBuyMode: () => void;
	toggleInvoiceMode: () => void;
	handleCellClick: (locationZ: number, id: number) => void;
	activeAreaCollection: any[];
	setSelectedIds: any;
	selectedIds: number[];
	setnftIdfun: any;
	nftId: number[];
	selectedCells: any;
	setSelectedCells: any;
	cellsData: any;
};

const CellModal: VFC<Props> = (props) => {
	const {
		isVisible,
		onClose,
		id,
		locationX,
		locationY,
		firstCellId,
		lastCellId,
		toggleBuyMode,
		handleCellClick,
		activeAreaCollection,
		toggleInvoiceMode,
		setSelectedIds,
		selectedIds,
		setnftIdfun,
		selectedCells,
		setSelectedCells,
		nftId,
		cellsData,
	} = props;
	const [isSelectMode, setIsSelectMode] = useState<boolean>(false);

	useEffect(() => {
		if (!isSelectMode) setSelectedIds([]);
	}, [isSelectMode]);

	const handleCloseModalClick = useCallback(() => {
		if (isSelectMode) {
			setIsSelectMode(false);
			onClose();
		}
		onClose();
	}, [isSelectMode, onClose]);

	const handleSelectCellClick = useCallback((id: number) => {
		setSelectedCells((prev: any) => [...prev, id]);
	}, []);

	const removeSelectCellItem = useCallback((id: number) => {
		setSelectedCells((prev: any) => [...prev.filter((e: number) => e !== id)]);
	}, []);

	const toggleSelectMode = useCallback(() => {
		setIsSelectMode((prev) => !prev);
	}, []);
	console.log(selectedCells);

	const handleBuyBtnClick = () => {
		if (isSelectMode) {
			toggleInvoiceMode();

			console.log(selectedCells);
		}

		toggleSelectMode();
	};

	console.log(selectedCells);

	return (
		<Modal isVisible={isVisible} onClose={onClose}>
			<Wrapper>
				<CloseBtn onClick={handleCloseModalClick}>
					{/* <img src={CLOSE_ICON} alt="Close" /> */}
					<CloseOutlined />
				</CloseBtn>
				<LabelId>Area #{id}</LabelId>
				<FlexWrapper>
					<CellsArea
						selectedCells={selectedCells}
						isSelectMode={isSelectMode}
						handleSelectCellClick={handleSelectCellClick}
						activeAreaCollection={activeAreaCollection}
						handleCellClick={handleCellClick}
						toggleBuyMode={toggleBuyMode}
						setnftIdfun={setnftIdfun}
						nftId={nftId}
						removeSelectCellItem={removeSelectCellItem}
					/>
					<InfoBlock>
						<InfoLabel>
							Area cells: from #{firstCellId} to #{lastCellId}
						</InfoLabel>
						<InfoText>
							Area coordinations: X<span>{locationX}</span>; Y
							<span>{locationY}</span>
						</InfoText>
						<BuyFewBtn onClick={handleBuyBtnClick}>
							{isSelectMode ? "Buy cells" : "Select cells"}
						</BuyFewBtn>
					</InfoBlock>
				</FlexWrapper>
			</Wrapper>
		</Modal>
	);
};

export default CellModal;
