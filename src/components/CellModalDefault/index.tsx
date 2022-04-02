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
  handleCellClick: (id: number) => void;
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
  } = props;

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <Wrapper>
        <CloseBtn onClick={onClose}>
          <img src={CLOSE_ICON} alt="Close" />
        </CloseBtn>
        <LabelId>#{id}</LabelId>
        <FlexWrapper>
          <CellsArea
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
          </InfoBlock>
        </FlexWrapper>
      </Wrapper>
    </Modal>
  );
};

export default CellModal;
