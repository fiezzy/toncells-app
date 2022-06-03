import { message } from "antd";
import { VFC, useEffect, useState, useCallback, useContext } from "react";
import Cells from "./components/Cells";
import { CellModalContext } from "./context";
import Container from "./components/Container";
import DockBar from "./components/DockBar";
import OpenOnDesktop from "./components/OpenOnDesktop";
import { useWindowDimensions } from "./hooks/useWindowDimensions";
import { NFT_ICONS } from "./constants/images";
import {
  NftIcon,
  CellsWrapperX,
  IconsX,
  CellsWrapperY,
  IconsY,
  ZoomWrapper,
  RootContainer,
} from "./style";
import GetStatus from "./logic/GetStatus";
import DescModeModal from "./components/DescModeModal";
import NftViewer from "./components/NftViewer";
import { createGlobalStyle } from "styled-components";
import CellModalInvoice from "./components/CellModalInvoice";

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
  const [selectedCells, setSelectedCellsa] = useState<number[]>([]);
  const [buyAlot, setbuyAlot] = useState<boolean>();
  const [cellsAreaData, setSelectedAreas] = useState<any[]>([]);

  const togglesetbuyAlot = useCallback(() => {
    if (buyAlot) {
      setSelectedCellsa([]);
      setSelectedAreas([]);
    }
    if (!hex) {
      setbuyAlot((prev) => !prev);
    } else {
      message.error("Finish last invoice!", 10);
    }
  }, [buyAlot, hex]);

  const buyAreas = () => {
    console.log("-0------");
    setIsInvoiceMode((prev) => !prev);
    setbuyAlot((prev) => !prev);
    setSelectedAreas([]);
    console.log(selectedCells);
  };

  const setSelectedCells = (e: any) => {
    // console.log(selectedCells, e);
    setSelectedCellsa(e);
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
    (async () => {
      setBigArr(await GetStatus());
    })();
  }, []);

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
    // if (isInvoiceMode) setSelectedCells([]);
    // if (isInvoiceMode) setSelectedIds([]);
  }, []);

  const nftItems = nftIcons.map((src) => (
    <NftIcon key={src} src={src} alt="#" />
  ));

  console.log(bigArr);

  const GlobalStyle = createGlobalStyle`
  	body {
	    overflow: ${isCellModalActive ? "hidden" : "scroll"};
	  }
  `;

  return (
    <>
      <GlobalStyle />
      <Container>
        <DockBar
          bigArr={bigArr}
          isBuyMode={isBuyMode}
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
          buyAlot={togglesetbuyAlot}
          buyAlotStatus={buyAlot}
          buyAreas={buyAreas}
        />
        {isBuyMode && (
          <NftViewer
            isBuyMode={isBuyMode}
            bigArr={bigArr}
            toggleBuyMode={toggleBuyMode}
          />
        )}
        {isDescMode && (
          <DescModeModal
            isDescMode={isDescMode}
            toggleDescMode={() => toggleDescMode((prev) => !prev)}
          />
        )}
        {isInvoiceMode && (
          <CellModalInvoice
            isVisible={isInvoiceMode}
            onClose={toggleInvoiceMode}
            cellIds={selectedCells}
            hex={hex}
            setHex={setHex}
            setSelectedCells={setSelectedCells}
            // isLocal={isLocal}
          />
        )}
        <RootContainer isZoomMode={isZoomMode}>
          <ZoomWrapper isZoomMode={isZoomMode}>
            <CellsWrapperX>
              <IconsX>{nftItems}</IconsX>
              <CellsWrapperY>
                <IconsY>{nftItems}</IconsY>
                <Cells
                  isZoomMode={isZoomMode}
                  onSideBar={onSideBar}
                  mapVersion={mapVersion}
                  nftImgs={nftIcons}
                  bigArr={bigArr}
                  setHex={setHex}
                  hex={hex}
                  selectedIds={selectedCells}
                  setSelectedIds={setSelectedCells}
                  setSelectedCells={setSelectedCells}
                  selectedCells={selectedCells}
                  isInvoiceMode={isInvoiceMode}
                  toggleInvoiceMode={toggleInvoiceMode}
                  buyAlot={buyAlot}
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
