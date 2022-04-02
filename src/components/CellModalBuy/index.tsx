import { VFC, useState, useCallback, memo } from "react";
import { Modal } from "../Modal";
import { CLOSE_ICON } from "../../constants/images";
import CellModalEdit from "../CellModalEdit";
import {
  Wrapper,
  LabelId,
  CloseBtn,
  FlexWrapper,
  InfoBlock,
  InfoText,
  Cell,
  InfoLabel,
  BuyButton,
} from "./style";

const CELL_ID = "0000";
const EDITABLE_CELL_ID = 6;

type Props = {
  isVisible: boolean;
  onClose: () => void;
  id: number;
  locationX: number;
  locationY: number;
  toggleBuyMode: () => void;
  activeCellId: number;
};

enum Location {
  X = 1,
  Y = 1,
  Z = 4,
}

const CellModalBuy: VFC<Props> = memo((props) => {
  const {
    isVisible,
    onClose,
    locationX,
    locationY,
    toggleBuyMode,
    activeCellId,
  } = props;

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <Wrapper>
        <CloseBtn onClick={toggleBuyMode}>
          <img src={CLOSE_ICON} alt="Close" />
        </CloseBtn>
        <LabelId>#{CELL_ID}</LabelId>
        <FlexWrapper>
          <Cell />
          <InfoBlock>
            <InfoLabel>
              TONCELL #{CELL_ID}
              <br />
              X: {locationX} | Y: {locationY} | Z: {activeCellId}
            </InfoLabel>
            <InfoText>
              <span>Description: </span>
              This item gives you an access to edit cell #432 of TonCells
              Project.
              <br />
              <br />
              TonCells is a 100x100 celled field where each cell can be edited.
              Make your unique NFT even more unique by customizing it how you
              want.
              <br />
              <br />
              Draw, add pictures & videos, edit your own description and mainly
              do whatever you want! This item gives you x% discount for the next
              purchase. / This item doesn't give you any discount.
            </InfoText>
            <BuyButton onClick={() => alert(`Buy Cell # ${CELL_ID}`)}>
              BUY
            </BuyButton>
          </InfoBlock>
        </FlexWrapper>
      </Wrapper>
    </Modal>
  );
});

export default CellModalBuy;
