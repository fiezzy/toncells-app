import { VFC, useState, useCallback, useEffect, useRef } from "react";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { DisplaySize } from "../../constants";
import { Modal } from "../Modal";
import CellsArea from "../CellsArea";
import CellInfoBlock from "./CellInfo";
import { CloseOutlined } from "@ant-design/icons";
import * as _ from "lodash";
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

const CellModalDefault: VFC<any> = (props) => {
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
    hex,
  } = props;
  const [isSelectMode, setIsSelectMode] = useState<boolean>(false);
  const [isCellInfoShowed, setIsCellInfoShowed] = useState<boolean>(false);
  const [opacity, setOpacity] = useState<number>(0);
  const setOp = _.debounce((e) => setOpacity(e), 100);
  const ref = useRef(null);
  const ref1 = useRef(null);

  const { width } = useWindowDimensions();

  useEffect(() => {
    // if (!isSelectMode && !hex) setSelectedIds([]);
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
      // setSelectedCells([]);
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
      onClose();
      // setSelectedCells(selectedCells);
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
        return null;
      }
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      if (ref.current) {
        //@ts-ignore
        ref.current.style.left = e.pageX + "px";
        //@ts-ignore
        ref.current.style.top = e.pageY + "px";
      }
    });
  }, [ref.current, isZoomMode]);

  if (hex) {
    return (
      <Modal isVisible={isVisible} onClose={onClose}>
        <Wrapper>
          <CloseBtn onClick={handleCloseModalClick}>
            <CloseOutlined />
          </CloseBtn>
          <LabelId>Complete last payment please</LabelId>
          <br />
          <br />
          <LabelId>
            You can see new button in sidebar (click on 1st button)
          </LabelId>
        </Wrapper>
      </Modal>
    );
  }

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <CellInfo
        ref={ref}
        style={{
          opacity: opacity,
          margin: "-42px -15px 42px 15px",
          minWidth: "88px",
        }}
      >
        {nftId[1] ? <img src={nftImgs[nftId[1] - 1]} alt="#" /> : null}
        {nftId[0] ? <img src={nftImgs[nftId[0] - 1]} alt="#" /> : null}
        {nftId[2] ? <img src={nftImgs[nftId[2] - 1]} alt="#" /> : null}
      </CellInfo>

      <Wrapper>
        <CloseBtn onClick={handleCloseModalClick}>
          {isSelectMode ? "Cancel" : <CloseOutlined />}
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
              if (width > DisplaySize.Tablet) {
                setOp(e);

                return;
              }
            }}
          />
          {isCellInfoShowed ? (
            <ColumnWrapper>
              <CellInfoBlock
                activeCellId={activeCellId}
                locationX={locationX}
                locationY={locationY}
                locationZ={locationZ}
                ownerData={getOwnerData()}
                status={cellsData && cellsData.status[activeCellId - 1].Status}
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
                Area coordinations: X<span>{locationY}</span>; Y
                <span>{locationX}</span>
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
