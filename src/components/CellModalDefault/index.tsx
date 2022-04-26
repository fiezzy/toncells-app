import { VFC, useState, useCallback, useEffect, useRef } from "react";
import { Modal } from "../Modal";
import CellsArea from "../CellsArea";
import CellInfo from "./CellInfo";
import { CLOSE_ICON } from "../../constants/images";
import { CloseOutlined } from "@ant-design/icons";
import {
	Wrapper,
	LabelId,
	CloseBtn,
	FlexWrapper,
	InfoBlock,
	InfoLabel,
	InfoText,
	BuyFewBtn,
	ColumnWrapper,
} from "./style";
import * as _ from "lodash";

type Props = {
	isVisible: boolean;
	onClose: () => void;
	id: number;
	locationX: number;
	locationY: number;
	locationZ: number;
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
	activeCellId: number;
	nftImgs: any;
	isZoomMode: any;
	CellInfo: any;
};

const CellModalDefault: VFC<Props> = (props) => {
	const {
		isVisible,
		onClose,
		id,
		locationX,
		locationY,
		locationZ,
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
		activeCellId,
		nftImgs,
		isZoomMode,
		CellInfo,
	} = props;
	const [isSelectMode, setIsSelectMode] = useState<boolean>(false);
	const [isCellInfoShowed, setIsCellInfoShowed] = useState<boolean>(false);
	const [opacity, setOpacity] = useState<number>(0);
	const setOp = _.debounce((e) => setOpacity(e), 100);
	const ref = useRef(null);
	const ref1 = useRef(null);
	useEffect(() => {
		if (!isSelectMode) setSelectedIds([]);
	}, [isSelectMode]);

	const currentCells: any[] = [];

	if (cellsData) {
		for (let i = firstCellId; i < lastCellId + 1; i++) {
			currentCells.push(cellsData.status[i - 1]);
		}
	}

	const handleCloseModalClick = useCallback(() => {
		if (isSelectMode) {
			setIsSelectMode(false);
			setSelectedCells([]);
		} else if (isCellInfoShowed) {
			setIsCellInfoShowed(false);
			onClose();
		} else {
			onClose();
		}
	}, [isCellInfoShowed, isSelectMode, onClose, setSelectedCells]);

	const handleSelectCellClick = useCallback((id: number) => {
		setSelectedCells((prev: any) => [...prev, id]);
	}, []);

	const removeSelectCellItem = useCallback((id: number) => {
		setSelectedCells((prev: any) => [...prev.filter((e: number) => e !== id)]);
	}, []);

	const toggleSelectMode = useCallback(() => {
		setIsSelectMode((prev) => !prev);
	}, []);

	const handleBuyBtnClick = () => {
		if (isSelectMode) {
			toggleInvoiceMode();

			console.log(selectedCells);
		}

		toggleSelectMode();
	};

	const getOwnerData = () => {
		if (cellsData) {
			let hasOwner = cellsData.status[activeCellId - 1].Status === "Minted";

			if (hasOwner) {
				const ownerData = {
					wallet: cellsData.status[activeCellId - 1].Wallet,
					hash: cellsData.status[activeCellId - 1].Hash,
				};

				return ownerData;
			} else {
				return {
					wallet: "free cell",
					hash: "click to buy",
				};
			}
		}
	};

	useEffect(() => {
		window.addEventListener("mousemove", (e) => {
			//@ts-ignore
			ref.current.style.left = e.pageX + "px";
			//@ts-ignore
			ref.current.style.top = e.pageY + "px";
		});
	}, [ref.current, isZoomMode]);

	return (
		<Modal isVisible={isVisible} onClose={onClose}>
			<CellInfo
				ref={ref}
				style={{
					opacity: opacity,
					margin: isZoomMode
						? "-32px -12px 32px 12px"
						: "32px -32px -32px 32px",
					minWidth: "88px",
				}}>
				{nftId[1] ? <img src={nftImgs[nftId[1] - 1]} alt="#" /> : null}
				{nftId[0] ? <img src={nftImgs[nftId[0] - 1]} alt="#" /> : null}
				{nftId[2] ? <img src={nftImgs[nftId[2] - 1]} alt="#" /> : null}
			</CellInfo>

			<Wrapper>
				<CloseBtn onClick={handleCloseModalClick}>
					{isSelectMode ? "Cansel" : <CloseOutlined />}
				</CloseBtn>
				<LabelId>Area #{id}</LabelId>
				<FlexWrapper>
					<CellsArea
						currentCells={currentCells}
						selectedCells={selectedCells}
						isSelectMode={isSelectMode}
						handleSelectCellClick={handleSelectCellClick}
						activeAreaCollection={activeAreaCollection}
						handleCellClick={handleCellClick}
						toggleBuyMode={toggleBuyMode}
						setnftIdfun={setnftIdfun}
						nftId={[locationX, locationY, nftImgs[2]]}
						removeSelectCellItem={removeSelectCellItem}
						setIsCellInfoShowed={(isShowed: boolean) =>
							setIsCellInfoShowed(isShowed)
						}
						onMouseOver={(e: any) => {
							setOp(e);
						}}
					/>
					{isCellInfoShowed ? (
						<ColumnWrapper>
							<CellInfo
								activeCellId={activeCellId}
								locationX={locationX}
								locationY={locationY}
								locationZ={locationZ}
								ownerData={getOwnerData()}
							/>
							<BuyFewBtn onClick={handleBuyBtnClick}>
								{isSelectMode ? "Buy cells" : "Select cells"}
							</BuyFewBtn>
						</ColumnWrapper>
					) : (
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
					)}
				</FlexWrapper>
			</Wrapper>
		</Modal>
	);
};

export default CellModalDefault;
