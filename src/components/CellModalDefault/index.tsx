import {
  VFC,
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext,
} from "react";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { CellModalContext } from "../../context";
import { DisplaySize } from "../../constants";
import { Modal } from "../Modal";
import CellsArea from "../CellsArea";
import CellInfoBlock from "./CellInfo";
import CellEditModal from "../CellEditModal";
import { CloseOutlined } from "@ant-design/icons";
import * as _ from "lodash";
import { StyledComponent } from "styled-components";
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
  BtnWrapper,
} from "./style";
import { AuthContext } from "../../context/AuthContext";

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
  setnftIdfun: (e: any) => void;
  nftId: number[];
  selectedCells: number[];
  setSelectedCells: (e: any) => void;
  cellsData: any;
  activeCellId: number;
  nftImgs: string[] | any;
  isZoomMode: boolean;
  CellInfo: StyledComponent<"div", any, {}, never>;
  hex: string;
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

  const [canEditCell, setCanEditCell] = useState<boolean>(false);
  const [isSelectMode, setIsSelectMode] = useState<boolean>(false);
  const [isCellInfoShowed, setIsCellInfoShowed] = useState<boolean>(false);
  const [opacity, setOpacity] = useState<number>(0);
  const setOp = _.debounce((e) => setOpacity(e), 100);
  const ref = useRef(null);

  const { isCellEditMode, toggleCellEditMode } = useContext(CellModalContext);
  const { isSigned } = useContext<any>(AuthContext);
  const { tonWalletAddress } = useContext<any>(AuthContext);

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
  }, [isCellInfoShowed, isSelectMode, onClose]);

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

  const checkForEditability = useCallback(
    (activeCell: number) => {
      if (isSigned) {
        if (cellsData) {
          let currentOwner = cellsData.status[activeCell - 1];

          console.log(currentOwner);

          if (
            currentOwner.Status === "Minted" &&
            tonWalletAddress === currentOwner.Wallet
          ) {
            setCanEditCell(true);
          } else {
            setCanEditCell(false);
          }
        }

        console.log(`Cell #${activeCell} is editable: ${canEditCell}`);

        console.log("checking");
      }
    },
    [canEditCell, cellsData, isSigned, tonWalletAddress]
  );

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
    <>
      {isCellEditMode ? (
        <CellEditModal
          activeCellId={activeCellId}
          isVisible={isCellEditMode}
          onClose={toggleCellEditMode}
        />
      ) : (
        <Modal isVisible={isVisible} onClose={handleCloseModalClick}>
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
                checkForEditability={checkForEditability}
              />
              {isCellInfoShowed ? (
                <ColumnWrapper>
                  <CellInfoBlock
                    activeCellId={activeCellId}
                    locationX={locationX}
                    locationY={locationY}
                    locationZ={locationZ}
                    ownerData={getOwnerData()}
                    status={
                      cellsData && cellsData.status[activeCellId - 1].Status
                    }
                  />
                  {canEditCell ? (
                    <BtnWrapper>
                      <BuyFewBtn onClick={handleBuyBtnClick}>
                        {isSelectMode ? "Buy cells" : "Select cells"}
                      </BuyFewBtn>
                      <BuyFewBtn onClick={toggleCellEditMode}>Edit</BuyFewBtn>
                    </BtnWrapper>
                  ) : (
                    <BuyFewBtn onClick={handleBuyBtnClick}>
                      {isSelectMode ? "Buy cells" : "Select cells"}
                    </BuyFewBtn>
                  )}
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
      )}
    </>
  );
};

export default CellModalDefault;
