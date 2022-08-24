import { VFC, useEffect, useState, useCallback, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Cells from "./components/Cells";
import { CellModalContext } from "./context";
import Container from "./components/Container";
import DockBar from "./components/DockBar";
import { ApiMaps } from "./constants";
import { NFT_ICONS } from "./constants/images";
import GetStatus from "./logic/GetStatus";
import { generateCellsCollection } from "./utils/generateCellsCollection";
import DescModeModal from "./components/DescModeModal";
import NftViewer from "./components/NftViewer";
import { createGlobalStyle } from "styled-components";
import CellModalInvoice from "./components/CellModalInvoice";
import ConnectWalletModal from "./components/ConnectWalletModal";
import UserModal from "./components/UserModal";
import OpenOnDesktop from "./components/OpenOnDesktop";
import { message } from "antd";
import {
	NftIcon,
	CellsWrapperX,
	IconsX,
	CellsWrapperY,
	IconsY,
	ZoomWrapper,
	RootContainer,
} from "./style";
import CellModalDefault from "./components/CellModalDefault";
import imga from "./nftitems/1.png";

import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, Upload } from "antd";
import React from "react";

export const nftIcons: string[] = [];

for (let i = 1; i < 26; i++) {
	nftIcons.push(`${NFT_ICONS + i}.png`);
}

const App: VFC = () => {
	const [bigArr, setBigArr] = useState();
	const [isBuyMode, setIsBuyMode] = useState<boolean>(false);
	const [isZoomMode, setIsZoomMode] = useState<boolean>(false);
	const [onSideBar, setonSideBar] = useState<boolean>(false);
	const [mapVersion, setMapVersion] = useState<number>(1);
	const [isDescMode, toggleDescMode] = useState<boolean>(false);
	const [hex, setHex] = useState<string>("");
	const [isInvoiceMode, setIsInvoiceMode] = useState<boolean>(false);
	const [selectedCells, updateSelectedCells] = useState<number[]>([]);
	const [isBuyALotMode, setBuyALotMode] = useState<boolean>(false);
	const [cellsAreaData, setSelectedAreas] = useState<any[]>([]);
	const [isConnectWalletMode, setIsConnectWalletMode] =
		useState<boolean>(false);
	const [isUserModalMode, setIsUserModalMode] = useState<boolean>(false);

	const [actualMaps, setActualMaps] = useState<string[]>([
		ApiMaps.Default,
		ApiMaps.Edit,
	]);

	const cellsCollection = generateCellsCollection();

	// TODO - ПРИВЕСТИ ЭТО ВСЕ В НОРМАЛЬНЫЙ ВИД
	const getMaps = useCallback(async () => {
		try {
			const fetchDefaultMap = await fetch(ApiMaps.Default);
			const fetchEditMap = await fetch(ApiMaps.Edit);

			const requestDefaultMap = await fetchDefaultMap.blob();
			const requestEditMap = await fetchEditMap.blob();

			const defaultMapImageObjectURL = URL.createObjectURL(requestDefaultMap);
			const editMapImageObjectURL = URL.createObjectURL(requestEditMap);

			setActualMaps([defaultMapImageObjectURL, editMapImageObjectURL]);
		} catch (error) {
			message.error(`${error}`);
		}
	}, []);
	const [selectedImage, setSelectedImage] = useState(null);
	useEffect(() => {
		function rgbToHex(r: any, g: any, b: any) {
			return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
		}

		setTimeout(function fetchMaps() {
			getMaps();
			setTimeout(fetchMaps, 30000);
		}, 30000);

		var img = new Image();
		img.src = selectedImage ? URL.createObjectURL(selectedImage) : "";
		var canvas = document.getElementById("canvas") as any;
		var ctx = canvas.getContext("2d");
		img.onload = function () {
			ctx.drawImage(img, 0, 0);
			console.log("var pixel = : ", ctx.getImageData(16, 16, 1, 1));
			var data = [] as any;

			for (let i = 0; i < 255; i++) {
				console.log(i);
				var pixel = ctx.getImageData(i % 16, Math.floor(i / 16), 1, 1);
				data = [...data, pixel.data];
				if (i === 254) {
					console.log(
						data.map((e: any) => rgbToHex(e[0], e[1], e[2])).join("")
					);
					console.log(data);
				}
			}
			// img.style.display = "none";
		};
	}, [getMaps, selectedImage]);

	useEffect(() => {
		(async () => {
			setBigArr(await GetStatus());

			setTimeout(async function fetchBigArr() {
				setBigArr(await GetStatus());

				setTimeout(fetchBigArr, 30000);
			}, 30000);
		})();
	}, []);

	const toggleBuyALotMode = useCallback(() => {
		if (isBuyALotMode) {
			updateSelectedCells([]);
			setSelectedAreas([]);
		}
		if (!hex) {
			setBuyALotMode((prev) => !prev);
		} else {
			message.error("Finish last invoice!", 10);
		}
	}, [isBuyALotMode, hex]);

	const buyAreas = () => {
		setIsInvoiceMode((prev) => !prev);
		setBuyALotMode((prev) => !prev);
		setSelectedAreas([]);
	};

	const setSelectedCells = (e: any) => {
		updateSelectedCells(e);
	};

	const { isCellModalActive } = useContext(CellModalContext);

	const toggleBuyMode = useCallback(() => {
		setIsBuyMode((prev) => !prev);
	}, []);

	const toggleMap = (mapold: any) => {
		let newMap = mapold + 1;
		if (newMap === 2) newMap = 0;

		setMapVersion(newMap);
	};

	useEffect(() => {
		const saved = localStorage.getItem("invoiceData");
		if (!!saved) {
			const initialValue = JSON.parse(saved);
			if (!!initialValue.hex) {
				setHex(initialValue.hex);
				setSelectedCells(initialValue.ids);
			}
		}
	}, []);

	console.log(bigArr);

	const toggleInvoiceMode = useCallback(() => {
		setIsInvoiceMode((prev) => !prev);
	}, []);

	const toggleConnectWalletMode = useCallback(() => {
		setIsConnectWalletMode((prev) => !prev);
	}, []);

	const toggleUserModalMode = useCallback(() => {
		setIsUserModalMode((prev) => !prev);
	}, []);

	const nftItems = nftIcons.map((src) => (
		<NftIcon key={src} src={src} alt="#" />
	));

	const GlobalStyle = createGlobalStyle`

  	body {
	    overflow: ${isCellModalActive ? "hidden" : "auto"};
	  }
  `;

	console.log(isCellModalActive);

	const OffScroll = createGlobalStyle<{ isOff: boolean }>`
      body {
        overflow: ${({ isOff }) => (isOff ? "hidden" : "scroll")};
      }
  `;

	return (
		<>
			<GlobalStyle />
			{selectedImage && (
				<div>
					<img
						alt="not fount"
						width={"250px"}
						src={URL.createObjectURL(selectedImage)}
					/>
					<br />
					<button onClick={() => setSelectedImage(null)}>Remove</button>
				</div>
			)}

			<canvas id="canvas" width={"16"} height={"16"}></canvas>
			<span id="color"></span>

			<input
				type="file"
				name="myImage"
				onChange={(event: any) => {
					setSelectedImage(event.target.files[0]);
				}}
			/>

			<Container>
				<DockBar
					bigArr={bigArr}
					toggleBuyMode={toggleBuyMode}
					toggleZoomMode={(isZoom: boolean) => setIsZoomMode(isZoom)}
					isZoomMode={isZoomMode}
					setonSideBar={(isSideBarActive: boolean) =>
						setonSideBar(isSideBarActive)
					}
					toggleMap={() => toggleMap(mapVersion)}
					toggleDescMode={() => toggleDescMode((prev) => !prev)}
					hex={hex}
					toggleInvoiceMode={toggleInvoiceMode}
					toggleBuyALotMode={toggleBuyALotMode}
					isBuyALotMode={isBuyALotMode}
					buyAreas={buyAreas}
					toggleConnectWalletMode={toggleConnectWalletMode}
					toggleUserModalMode={toggleUserModalMode}
				/>

				{isBuyMode && (
					<>
						<OffScroll isOff={isBuyMode} />
						<NftViewer
							isBuyMode={isBuyMode}
							bigArr={bigArr}
							toggleBuyMode={toggleBuyMode}
						/>
					</>
				)}

				{isDescMode && (
					<DescModeModal
						isDescMode={isDescMode}
						toggleDescMode={() => toggleDescMode((prev) => !prev)}
					/>
				)}

				{isInvoiceMode && (
					<>
						<OffScroll isOff={isInvoiceMode} />
						<CellModalInvoice
							isVisible={isInvoiceMode}
							onClose={toggleInvoiceMode}
							cellIds={selectedCells}
							hex={hex}
							setHex={setHex}
							setSelectedCells={setSelectedCells}
						/>
					</>
				)}

				{isConnectWalletMode && (
					<>
						<OffScroll isOff={isConnectWalletMode} />
						<ConnectWalletModal
							isVisible={isConnectWalletMode}
							onClose={toggleConnectWalletMode}
							toggleUserModalMode={toggleUserModalMode}
						/>
					</>
				)}

				{isUserModalMode && (
					<>
						<OffScroll isOff={isUserModalMode} />
						<UserModal
							cellsData={bigArr}
							isVisible={isUserModalMode}
							onClose={toggleUserModalMode}
							toggleConnectWalletMode={toggleConnectWalletMode}
							cellsCollection={cellsCollection}
						/>
					</>
				)}

				<RootContainer isZoomMode={isZoomMode}>
					<ZoomWrapper isZoomMode={isZoomMode}>
						<CellsWrapperX>
							<IconsX>{nftItems}</IconsX>
							<CellsWrapperY>
								<IconsY>{nftItems}</IconsY>
								<Cells
									actualMaps={actualMaps}
									isZoomMode={isZoomMode}
									onSideBar={onSideBar}
									mapVersion={mapVersion}
									nftImgs={nftIcons}
									bigArr={bigArr}
									setHex={setHex}
									hex={hex}
									setSelectedCells={setSelectedCells}
									selectedCells={selectedCells}
									isInvoiceMode={isInvoiceMode}
									toggleInvoiceMode={toggleInvoiceMode}
									isBuyALotMode={isBuyALotMode}
									cellsAreaData={cellsAreaData}
									setSelectedAreas={setSelectedAreas}
									cellsCollection={cellsCollection}
								/>
							</CellsWrapperY>
						</CellsWrapperX>
					</ZoomWrapper>
				</RootContainer>
			</Container>
		</>
	);
};

export default App;
