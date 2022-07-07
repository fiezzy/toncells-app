import { message } from "antd";
import { VFC, useEffect, useState, useCallback, useContext } from "react";
import Cells from "./components/Cells";
import { CellModalContext } from "./context";
import Container from "./components/Container";
import DockBar from "./components/DockBar";
import { ApiMaps } from "./constants";
import { NFT_ICONS } from "./constants/images";
import GetStatus from "./logic/GetStatus";
import DescModeModal from "./components/DescModeModal";
import NftViewer from "./components/NftViewer";
import { createGlobalStyle } from "styled-components";
import CellModalInvoice from "./components/CellModalInvoice";
import ConnectWalletModal from "./components/ConnectWalletModal";
import UserModal from "./components/UserModal";
import {
  NftIcon,
  CellsWrapperX,
  IconsX,
  CellsWrapperY,
  IconsY,
  ZoomWrapper,
  RootContainer,
} from "./style";

export const nftIcons: string[] = [];

for (let i = 1; i < 26; i++) {
  nftIcons.push(`${NFT_ICONS + i}.png`);
}

const App: VFC = () => {
  const [bigArr, setBigArr] = useState();
  const [isBuyMode, setIsBuyMode] = useState<boolean>(false);
  const [isZoomMode, setIsZoomMode] = useState<boolean>(false);
  const [onSideBar, setonSideBar] = useState<boolean>(false);
  const [mapVersion, setMapVersion] = useState<number>(0);
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
    ApiMaps.Free,
    ApiMaps.Minted,
  ]);

  // TODO - ПРИВЕСТИ ЭТО ВСЕ В НОРМАЛЬНЫЙ ВИД
  const getMaps = useCallback(async () => {
    try {
      const fetchDefaultMap = await fetch(ApiMaps.Default);
      const fetchFreeMap = await fetch(ApiMaps.Free);
      const fetchMintedMap = await fetch(ApiMaps.Minted);

      const requestDefaultMap = await fetchDefaultMap.blob();
      const requestFreetMap = await fetchFreeMap.blob();
      const requestMintedMap = await fetchMintedMap.blob();

      const defaultMapImageObjectURL = URL.createObjectURL(requestDefaultMap);
      const freeMapImageObjectURL = URL.createObjectURL(requestFreetMap);
      const mintedMapImageObjectURL = URL.createObjectURL(requestMintedMap);

      setActualMaps([
        defaultMapImageObjectURL,
        freeMapImageObjectURL,
        mintedMapImageObjectURL,
      ]);
    } catch (error) {
      message.error(`${error}`);
    }
  }, []);

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
    if (newMap === 3) newMap = 0;

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
	    overflow: ${isCellModalActive ? "hidden" : "scroll"};
      overflow-x: hidden;
	  }
  `;

  const OffScroll = createGlobalStyle<{ isOff: boolean }>`
      body {
        overflow: ${({ isOff }) => (isOff ? "hidden" : "scroll")};
      }
  `;

  return (
    <>
      <GlobalStyle />
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
