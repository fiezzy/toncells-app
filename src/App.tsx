import { VFC, useEffect, useState, useCallback } from "react";
import Cells from "./components/Cells";
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
} from "./style";
import GetStatus from "./logic/GetStatus";
import DescModeModal from "./components/DescModeModal";
import NftViewer from "./components/NftViewer";

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

  const { width } = useWindowDimensions();

  const nftItems = nftIcons.map((src) => (
    <NftIcon key={src} src={src} alt="#" />
  ));
  // return <OpenOnDesktop />;
  if (width < 768) {
    return <OpenOnDesktop />;
  }

  console.log(bigArr);

  return (
    <>
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
              />
            </CellsWrapperY>
          </CellsWrapperX>
        </ZoomWrapper>
      </Container>
    </>
  );
};

export default App;
