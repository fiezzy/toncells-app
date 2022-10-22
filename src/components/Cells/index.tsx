import {
	VFC,
	useContext,
	useEffect,
	useState,
	useCallback,
	useRef,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { DisplaySize } from "../../constants";
import { CellModalContext } from "../../context";
import CellModalDefault from "../CellModalDefault";
import CellAreaSmall from "./CellsAreaSmall";
import CenteredBlock from "./CenteredBlock";
import { getAreaByCellId } from "../../utils/getAreaByCellId";
import { App } from "../../typings";
import * as _ from "lodash";
import { Wrapper, CellInfo, Text } from "./style";
import { message } from "antd";

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

type Props = {
	isZoomMode: boolean;
	onSideBar: boolean;
	mapVersion: number;
	nftImgs: string[];
	bigArr?: any[];
	hex: string;
	setHex: (arg: string) => void;
	selectedCells: any[];
	setSelectedCells: (e: any) => void;
	toggleInvoiceMode: () => void;
	isBuyALotMode?: boolean;
	setSelectedAreas: (area: any) => void;
	cellsAreaData: any[];
	actualMaps: string[];
	isInvoiceMode: boolean;
	cellsCollection: App.CellsAreaType[];
};

const Cells: VFC<Props> = (props) => {
	const {
		isZoomMode,
		onSideBar,
		mapVersion,
		nftImgs,
		bigArr,
		hex,
		setHex,
		selectedCells,
		setSelectedCells,
		toggleInvoiceMode,
		isBuyALotMode,
		setSelectedAreas,
		cellsAreaData,
		actualMaps,
		cellsCollection,
	} = props;

	const [activeAreaData, setActiveAreaData] = useState<App.CellsAreaType>({
		id: 1,
		x: 1,
		y: 1,
		firstCellId: 1,
		lastCellId: 16,
	});
	const [isBuyMode, setIsBuyMode] = useState<boolean>(false);
	const [activeCellId, setActiveCellId] = useState<number>(1);
	const [locationZ, setLocationZ] = useState<number>(0);
	const [nftId, setnftId] = useState<number[]>([0, 0, 0]);

	const { toggleCellModal, isCellModalActive } = useContext(CellModalContext);

	const { width } = useWindowDimensions();

	let navigate = useNavigate();
	let location = useLocation();

	useEffect(() => {
		// if (!isCellModalActive && !hex) setSelectedIds([]);
	}, [isCellModalActive]);

	const toggleBuyMode = useCallback(() => {
		setIsBuyMode((prev) => !prev);
	}, []);

	const handleSelectCellClick = (id: number) => {
		setSelectedCells((prev: any) => [...prev, id]);
	};

	const removeSelectCellItem123 = (id: number) => {
		setSelectedCells((prev: any) => [...prev.filter((e: number) => e !== id)]);
	};

	const handleSelectCellClick123 = (id: number) => {
		setSelectedAreas((prev: any) => [...prev, id]);
	};

	const removeSelectCellItem123123 = (id: number) => {
		setSelectedAreas((prev: any) => [...prev.filter((e: number) => e !== id)]);
	};

	let routeCellId = Number(location.pathname.substring(1));

	const cellModalHendler = useCallback(() => {
		if (routeCellId > 0 && !isCellModalActive) {
			let currentArea = getAreaByCellId(routeCellId, cellsCollection);

			if (checkAreaId(currentArea.id)) {
				toggleCellModal();

				setActiveCellId(routeCellId);

				setActiveAreaData(currentArea);
			} else {
				message.error("Oops, can't do that now ;(");
			}
		}
	}, [cellsCollection, isCellModalActive, routeCellId, toggleCellModal]);

	useEffect(() => {
		cellModalHendler();
	}, [cellModalHendler, routeCellId]);

	const handleCellsAreaClick = (
		id: number,
		x: number,
		y: number,
		firstCellId: number,
		lastCellId: number
	) => {
		if (!isBuyALotMode) {
			toggleCellModal();

			setActiveAreaData({
				id: id,
				x: x,
				y: y,
				firstCellId: firstCellId,
				lastCellId: lastCellId,
			});
		} else {
			let i: number = firstCellId;

			while (i <= lastCellId) {
				if (!cellsAreaData[0]) {
					handleSelectCellClick(i);
				} else {
					removeSelectCellItem123(i);
				}

				i++;
			}

			if (!cellsAreaData[0]) {
				handleSelectCellClick123(id);
			} else {
				removeSelectCellItem123123(id);
			}
		}
	};

	const onClose = () => {
		navigate("/");
		toggleCellModal();
	};

	const handleCellClick = useCallback((locationZ: number, id: number) => {
		setLocationZ(locationZ!);
		setActiveCellId(id);
	}, []);

	const removeSelectCellItem = useCallback((locationZ: number, id: number) => {
		setLocationZ(locationZ);
		setActiveCellId(id);
	}, []);

	// console.log(nftId);

	const setnftIdfun = _.debounce((e) => setnftId(e), 100);

	const [opacity, setOpacity] = useState<number>(0);

	const setOp = _.debounce((e) => setOpacity(e), 100);
	const ref = useRef<any>(null);
	const ref1 = useRef(null);
	const activeAreaCollection: any[] = [];

	useEffect(() => {
		if (width > DisplaySize.Tablet) {
			window.addEventListener("mousemove", (e) => {
				if (isZoomMode) {
					if (ref.current) {
						ref.current.style.left = e.pageX + "px";
						ref.current.style.top = e.pageY + "px";
					}
				} else {
					if (ref.current) {
						ref.current.style.left =
							(e.pageX - (document.body.clientWidth - 774) / 2) * 2.2222222222 +
							"px";

						ref.current.style.top = (e.pageY - 38) * 2.2222222222 + "px";
					}
				}
			});
		}
	}, [ref.current, isZoomMode, width]);

	for (
		let id = activeAreaData.firstCellId!;
		id < activeAreaData.lastCellId! + 1;
		id++
	) {
		activeAreaCollection.push({
			id: id,
		});
	}

	let map = mapVersion === 0 ? actualMaps[0] : actualMaps[1];

	return (
		<>
			<Wrapper
				ref={ref1}
				onMouseOut={() => {
					if (isCellModalActive) {
						setnftIdfun([0, 0, 0]);
					}
					if (width > DisplaySize.Tablet) {
						setOp(0);
					}
				}}
				// on
				onMouseEnter={() => {
					setnftIdfun([1, 1, 0]);
				}}
				onMouseOver={() => {
					if (width > DisplaySize.Tablet) {
						setOp(1);
					}
				}}>
				<CellInfo
					ref={ref}
					style={{
						opacity: opacity,
						margin: isZoomMode
							? "-32px -12px 32px 12px"
							: "32px -32px -32px 32px",
					}}>
					{nftId[1] ? <img src={nftImgs[nftId[1] - 1]} alt="#" /> : null}
					{nftId[0] ? <img src={nftImgs[nftId[0] - 1]} alt="#" /> : null}
				</CellInfo>

				<img
					src={map}
					alt="#"
					style={{ boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" }}
				/>

				<CenteredBlock />
				{cellsCollection.map(({ id, x, y, firstCellId, lastCellId }) => (
					<div
						key={id}
						onClick={() =>
							checkAreaId(id)
								? handleCellsAreaClick(id, x, y, firstCellId!, lastCellId!)
								: null
						}
						style={{
							background: checkAreaId(id)
								? cellsAreaData.includes(id)
									? "red"
									: ""
								: "rgba(128, 128, 128, 0.45)",
							cursor: checkAreaId(id) ? "pointer" : "not-allowed",
							zIndex: "10",
						}}
						onMouseOver={() => {
							setnftIdfun([x, y, 0]);
						}}>
						<CellAreaSmall
							key={id}
							areaId={checkAreaId(id) ? id : null}
							isActive={checkAreaId(id)}
						/>
					</div>
				))}
			</Wrapper>

			<CellModalDefault
				isVisible={isCellModalActive}
				onClose={onClose}
				id={activeAreaData.id}
				locationX={activeAreaData.x}
				locationY={activeAreaData.y}
				locationZ={locationZ}
				firstCellId={activeAreaData.firstCellId!}
				lastCellId={activeAreaData.lastCellId!}
				toggleBuyMode={toggleBuyMode}
				handleCellClick={handleCellClick}
				activeAreaCollection={activeAreaCollection}
				toggleInvoiceMode={toggleInvoiceMode}
				setnftIdfun={setnftIdfun}
				nftId={nftId}
				selectedCells={selectedCells}
				setSelectedCells={setSelectedCells}
				cellsData={bigArr}
				activeCellId={activeCellId}
				nftImgs={nftImgs}
				isZoomMode={isZoomMode}
				CellInfo={CellInfo}
				hex={hex}
				setActveCellId={setActiveCellId}
			/>
		</>
	);
};

export default Cells;
