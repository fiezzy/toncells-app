import { VFC } from "react";
import { Modal } from "../Modal";
import { CLOSE_ICON } from "../../constants/images";
import { Wrapper, LabelId, CloseBtn } from "./style";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  id: number;
  locationX: number;
  locationY: number;
};

const CellModal: VFC<Props> = (props) => {
  const { isVisible, onClose, id, locationX, locationY } = props;

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <Wrapper>
        <CloseBtn onClick={onClose}>
          <img src={CLOSE_ICON} alt="Close" />
        </CloseBtn>
        <LabelId>#{id}</LabelId>
      </Wrapper>
    </Modal>
  );
};

export default CellModal;
