import { VFC, memo, useState } from "react";
import { Modal } from "../Modal";
import { CLOSE_ICON } from "../../constants/images";
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

type Props = {
  isVisible: boolean;
  onClose: () => void;
  locationX: number;
  locationY: number;
  activeCellId: number;
};

const CellModal: VFC<Props> = memo((props) => {
  const { isVisible, onClose, locationX, locationY, activeCellId } = props;
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const toggleEditMode = () => {
    setIsEdit((prev) => !prev);
  };

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <Wrapper>
        <CloseBtn onClick={onClose}>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi
              <br />
              ut aliquip ex ea commodo consequat.
              <br />
              <br />
              <span>Price:</span> 15TON
              <br />
              <span>Discount:</span> 15TON
              <br />
              <span>Owner:</span> 0x000000.....0000
              <br />
              <span>Buying date:</span> 02.04.2022
            </InfoText>
            {isEdit ? (
              <BuyButton onClick={toggleEditMode}>SAVE</BuyButton>
            ) : (
              <BuyButton onClick={toggleEditMode}>EDIT</BuyButton>
            )}
          </InfoBlock>
        </FlexWrapper>
      </Wrapper>
    </Modal>
  );
});

export default CellModal;
