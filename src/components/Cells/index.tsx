import {
	VFC,
	useContext,
	useEffect,
	useState,
	useCallback,
	useRef,
	Fragment,
} from "react";
import { CellModalContext } from "../../context";
import { CELLS_AREA } from "../../constants/images";
import { Wrapper, CellInfo } from "./style";
import CellModalDefault from "../CellModalDefault";
import CellModalBuy from "../CellModalBuy";
import CellModalInvoice from "../CellModalInvoice";
import CellModalEdit from "../CellModalEdit";
import CellAreaSmall from "./CellsAreaSmall";
import * as _ from "lodash";

import png1 from "../../nftitems/1.png";
import png2 from "../../nftitems/2.png";
import png3 from "../../nftitems/3.png";
import png4 from "../../nftitems/4.png";
import png5 from "../../nftitems/5.png";
import png6 from "../../nftitems/6.png";
import png7 from "../../nftitems/7.png";
import png8 from "../../nftitems/8.png";
import png9 from "../../nftitems/9.png";
import png10 from "../../nftitems/10.png";
import png11 from "../../nftitems/11.png";
import png12 from "../../nftitems/12.png";
import png13 from "../../nftitems/13.png";
import png14 from "../../nftitems/14.png";
import png15 from "../../nftitems/15.png";
import png16 from "../../nftitems/16.png";
import png17 from "../../nftitems/17.png";
import png18 from "../../nftitems/18.png";
import png19 from "../../nftitems/19.png";
import png20 from "../../nftitems/20.png";
import png21 from "../../nftitems/21.png";
import png22 from "../../nftitems/22.png";
import png23 from "../../nftitems/23.png";
import png24 from "../../nftitems/24.png";
import png25 from "../../nftitems/25.png";

const imgs = [
	png1,
	png2,
	png3,
	png4,
	png5,
	png6,
	png7,
	png8,
	png9,
	png10,
	png11,
	png12,
	png13,
	png14,
	png15,
	png16,
	png17,
	png18,
	png19,
	png20,
	png21,
	png22,
	png23,
	png24,
	png25,
];

// const EDITABLE_CELL_ID = 6;

type CellsAreaType = {
	id: number;
	x: number;
	y: number;
	lastCellId?: number;
	firstCellId?: number;
};

const cellsCollection: CellsAreaType[] = [
	{
		id: 1,
		x: 1,
		y: 1,
		lastCellId: 16,
		firstCellId: 1,
	},
];

for (let x = 1; x < 26; x++) {
	for (let y = 1; y < 26; y++) {
		cellsCollection.push({
			id: 1,
			x: x,
			y: y,
		});
	}
}

const checkAreaId = (id: number) => {
	let i = 28;
	while (i <= 528) {
		i += 25;
		if (id >= i && id <= i + 20) return false;
	}
	return true;
};

const checkCellId = (id: number) => {
	let i = 28;
	while (i <= 528) {
		i += 25;
		if (
			id >= convertAreaIdToFirstCellId(i) &&
			id <= convertAreaIdToLastCellId(i + 20)
		)
			return false;
	}
	return true;
};

const convertAreaIdToFirstCellId = (id: number) => (id - 1) * 16 + 1;
const convertAreaIdToLastCellId = (id: number) => id * 16 - 1;

cellsCollection.shift();
cellsCollection.forEach((cellsArea, idx) => {
	cellsArea.id += idx;
	cellsArea.lastCellId = cellsArea.id * 16;
	cellsArea.firstCellId = cellsArea.lastCellId - 16 + 1;
});

const Cells: VFC = () => {
	const { toggleCellModal, isCellModalActive } = useContext(CellModalContext);
	const [activeAreaData, setActiveAreaData] = useState<CellsAreaType>({
		id: 1,
		x: 1,
		y: 1,
		firstCellId: 1,
		lastCellId: 16,
	});
	const [isBuyMode, setIsBuyMode] = useState<boolean>(false);
	const [isInvoiceMode, setIsInvoiceMode] = useState<boolean>(false);
	const [isEditMode, setIsEditMode] = useState<boolean>(false);
	const [activeCellId, setActiveCellId] = useState<number>(0);
	const [locationZ, setLocationZ] = useState<number>(0);
	const [cellsData, setCellsData] = useState();
	const [selectedIds, setSelectedIds] = useState<number[]>([]);
	const [nftId, setnftId] = useState<number[]>([1, 1]);
	// const [cellsAreaData, setCellsAreaData] = useState<any[]>([]);

	const toggleBuyMode = useCallback(() => {
		setIsBuyMode((prev) => !prev);
	}, []);

	// const toggleEditMode = useCallback(() => {
	//   setIsEditMode((prev) => !prev);

	//   if (activeCellId === EDITABLE_CELL_ID && !isEditMode) {
	//     setIsBuyMode(false);
	//   }
	// }, [activeCellId, isEditMode]);

	const handleCellsAreaClick = (
		id: number,
		x: number,
		y: number,
		firstCellId?: number,
		lastCellId?: number
	) => {
		toggleCellModal();

		setActiveAreaData({
			id: id,
			x: x,
			y: y,
			firstCellId: firstCellId!,
			lastCellId: lastCellId!,
		});
	};

	const handleCellClick = useCallback((locationZ: number, id: number) => {
		setLocationZ(locationZ);
		setActiveCellId(id);

		// if (locationZ === EDITABLE_CELL_ID) {
		//   setIsEditMode(true);
		// }
	}, []);

	const toggleInvoiceMode = useCallback(() => {
		setIsInvoiceMode((prev) => !prev);
	}, []);

	console.log(nftId);
	const setnftIdfun = _.debounce((e) => setnftId(e), 100);

	const ref = useRef(null);

	useEffect(() => {
		window.addEventListener("mousemove", (e) => {
			//@ts-ignore
			ref.current.style.left = e.pageX + "px";
			//@ts-ignore
			ref.current.style.top = e.pageY + "px";
		});
	}, [ref.current]);

	useEffect(() => {
		try {
			fetch("data.json")
				.then((res) => res.json())
				.then((data) => setCellsData(data));
		} catch (error) {
			console.log(`Error: ${error}`);
		}
	}, []);

	const activeAreaCollection: any[] = [];

	for (
		let id = activeAreaData.firstCellId!;
		id < activeAreaData.lastCellId! + 1;
		id++
	) {
		activeAreaCollection.push({
			id: id,
		});
	}

	return (
		<>
			<CellInfo ref={ref} style={{ opacity: !!nftId[0] ? "1" : "0" }}>
				<img src={imgs[nftId[0] - 1]} />
				<img src={imgs[nftId[1] - 1]} />
			</CellInfo>
			<Wrapper
				onMouseOut={() => {
					setnftIdfun([0, 0]);
				}}
				onMouseEnter={() => {
					setnftIdfun([1, 1]);
				}}>
				{cellsCollection.map(({ id, x, y, firstCellId, lastCellId }) => (
					<div
						key={id}
						onClick={() =>
							checkAreaId(id)
								? handleCellsAreaClick(id, x, y, firstCellId, lastCellId)
								: null
						}
						style={{
							filter: checkAreaId(id) ? "" : "blur(0.5px) brightness(75%)",
							cursor: checkAreaId(id) ? "pointer" : "not-allowed",
						}}
						onMouseOver={() => {
							setnftIdfun([x, y]);
						}}>
						<CellAreaSmall
							key={id}
							firstCellId={firstCellId!}
							lastCellId={lastCellId!}
						/>
					</div>
				))}
			</Wrapper>
			{/* {isEditMode ? (
        <CellModalEdit
          isVisible={isCellModalActive}
          locationX={activeAreaData.x}
          locationY={activeAreaData.y}
          activeCellId={activeCellId}
          onClose={toggleEditMode}
        /> */}
			{isBuyMode ? (
				<CellModalBuy
					isVisible={isCellModalActive}
					onClose={toggleCellModal}
					id={activeAreaData.id}
					locationX={activeAreaData.x}
					locationY={activeAreaData.y}
					locationZ={locationZ}
					toggleBuyMode={toggleBuyMode}
					activeCellId={activeCellId}
					cellIds={selectedIds}
				/>
			) : isInvoiceMode ? (
				<CellModalInvoice
					isVisible={isCellModalActive}
					onClose={toggleCellModal}
					id={activeAreaData.id}
					locationX={activeAreaData.x}
					locationY={activeAreaData.y}
					toggleInvoiceMode={toggleInvoiceMode}
					activeCellId={activeCellId}
					cellIds={selectedIds}
				/>
			) : (
				<CellModalDefault
					isVisible={isCellModalActive}
					onClose={toggleCellModal}
					id={activeAreaData.id}
					locationX={activeAreaData.x}
					locationY={activeAreaData.y}
					firstCellId={activeAreaData.firstCellId!}
					lastCellId={activeAreaData.lastCellId!}
					toggleBuyMode={toggleBuyMode}
					handleCellClick={handleCellClick}
					activeAreaCollection={activeAreaCollection}
					toggleInvoiceMode={toggleInvoiceMode}
					setSelectedIds={setSelectedIds}
					selectedIds={selectedIds}
				/>
			)}
		</>
	);
};

export default Cells;
