import { VFC, useState, useCallback } from "react";
import { Modal } from "../Modal";
import CellsArea from "../CellsArea";
import { CLOSE_ICON } from "../../constants/images";
import {
  Wrapper,
  LabelId,
  CloseBtn,
  FlexWrapper,
  InfoBlock,
  InfoLabel,
  InfoText,
  BuyFewBtn,
} from "./style";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  id: number;
  locationX: number;
  locationY: number;
  firstCellId: number;
  lastCellId: number;
  toggleBuyMode: () => void;
  handleCellClick: (locationZ: number, id: number) => void;
  activeAreaCollection: any[];
};

const CellModal: VFC<Props> = (props) => {
  const {
    isVisible,
    onClose,
    id,
    locationX,
    locationY,
    firstCellId,
    lastCellId,
    toggleBuyMode,
    handleCellClick,
    activeAreaCollection,
  } = props;
  const [isSelectMode, setIsSelectMode] = useState<boolean>(false);
  const [selectedCells, setSelectedCells] = useState<number[]>([]);

  const handleCloseModalClick = useCallback(() => {
    if (isSelectMode) {
      setIsSelectMode(false);
      onClose();
    }
    onClose();
  }, [isSelectMode, onClose]);

  const handleSelectCellClick = useCallback((id: number) => {
    setSelectedCells((prev) => [...prev, id]);
  }, []);

  const toggleSelectMode = useCallback(() => {
    setIsSelectMode((prev) => !prev);
  }, []);

  const handleBuyBtnClick = () => {
    if (isSelectMode) {
      alert("Success!");
    }

    toggleSelectMode();
  };

  console.log(selectedCells);

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <Wrapper>
        <CloseBtn onClick={handleCloseModalClick}>
          <img src={CLOSE_ICON} alt="Close" />
        </CloseBtn>
        <LabelId>#{id}</LabelId>
        <FlexWrapper>
          <CellsArea
            selectedCells={selectedCells}
            isSelectMode={isSelectMode}
            handleSelectCellClick={handleSelectCellClick}
            activeAreaCollection={activeAreaCollection}
            handleCellClick={handleCellClick}
            toggleBuyMode={toggleBuyMode}
          />
          <InfoBlock>
            <InfoLabel>
              CELLS: {firstCellId} - {lastCellId}
            </InfoLabel>
            <InfoText>
              X: <span>{locationX}</span>, Y: <span>{locationY}</span>
            </InfoText>
            <BuyFewBtn onClick={handleBuyBtnClick}>
              {isSelectMode ? "BUY" : "BUY A FEW"}
            </BuyFewBtn>
          </InfoBlock>
        </FlexWrapper>
      </Wrapper>
    </Modal>
  );
};

export default CellModal;
