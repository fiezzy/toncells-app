import { VFC, useEffect, useState, useCallback, useContext } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Cells from "./components/Cells";
import { CellModalContext } from "./context";
import ContainerA from "./components/Container";
import DockBar from "./components/DockBar";
import { ApiMaps } from "./constants";
import { NFT_ICONS } from "./constants/images";
import GetStatus from "./logic/GetStatus";
import { generateCellsCollection } from "./utils/generateCellsCollection";
import DescModeModal from "./components/DescModeModal";
import NftViewer from "./components/NftViewer";
import { createGlobalStyle } from "styled-components";
import { useWindowDimensions } from "./hooks/useWindowDimensions";
import CellModalInvoice from "./components/CellModalInvoice";
import ConnectWalletModal from "./components/ConnectWalletModal";
import UserModal from "./components/UserModal";
import SomethingWentWrong from "./components/SomethingWentWrong";
import { message } from "antd";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import {
	NftIcon,
	CellsWrapperX,
	IconsX,
	CellsWrapperY,
	IconsY,
	ZoomWrapper,
	RootContainer,
} from "./style";
import "./gstile.css";
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

const Particlesas = Particles as any;
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

	const particlesInit = useCallback(async (engine: Engine) => {
		console.log(engine);

		// you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		await loadFull(engine);
	}, []);

	const particlesLoaded = useCallback(
		async (container: Container | undefined) => {
			await console.log(container);
		},
		[]
	);

	useEffect(() => {
		setTimeout(function fetchMaps() {
			getMaps();
			setTimeout(fetchMaps, 30000);
		}, 30000);
	}, [getMaps]);

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

	const ParticlesApp: JSX.Element = (
		<Particlesas
			className="tsparticles"
			key="adf"
			init={particlesInit}
			loaded={particlesLoaded}
			options={{
				background: {
					color: {
						value: "#ffffff",
					},
				},
				fpsLimit: 60,
				interactivity: {
					events: {
						onClick: {
							enable: false,
							mode: "push",
						},
						onHover: {
							enable: false,
							mode: "repulse",
						},
						resize: false,
					},
					modes: {
						push: {
							quantity: 4,
						},
						repulse: {
							distance: 200,
							duration: 0.4,
						},
					},
				},
				particles: {
					color: {
						value: "#000",
					},
					links: {
						color: "#000",
						distance: 150,
						enable: true,
						opacity: 0.5,
						width: 1,
					},
					collisions: {
						enable: true,
					},
					move: {
						direction: "none",
						enable: true,
						outModes: {
							default: "bounce",
						},
						random: false,
						speed: 0.5,
						straight: false,
					},
					number: {
						density: {
							enable: true,
							area: 800,
						},
						value: 40,
					},
					opacity: {
						value: 0.5,
					},
					shape: {
						type: "circle",
					},
					size: {
						value: { min: 1, max: 5 },
					},
				},
				detectRetina: true,
			}}
		/>
	);
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

			<canvas
				id="canvas"
				width={"16"}
				height={"16"}
				style={{ opacity: "0" }}></canvas>
			<span style={{ opacity: "0" }} id="color"></span>

			<input
				type="file"
				name="myImage"
				style={{ opacity: "0" }}
				onChange={(event: any) => {
					setSelectedImage(event.target.files[0]);
				}}
			/>

			<ContainerA>
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
				{ParticlesApp}
			</ContainerA>
		</>
	);
};

export default App;
