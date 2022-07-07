import { VFC, useState, useCallback } from "react";
import { Modal } from "../Modal";
import CellEditPixels from "./components/CellEditPixels";
import CellEditColorBlock from "./components/CellEditColorBlock";
import CellEditInfoBlock from "./components/CellEditInfoBlock";
import { PixelType } from "./types";
import { message } from "antd";
import {
  Wrapper,
  Title,
  CloseBtn,
  FlexWrapper,
  EditBlock,
  SubEditMenu,
  SubMenuItem,
  EditBlockWrapper,
} from "./style";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  activeCellId: number;
};

const editablePixels: PixelType[] = [
  { id: 1, hex: "#FFFFFF" },
  { id: 2, hex: "#FFFFFF" },
  { id: 3, hex: "#FFFFFF" },
  { id: 4, hex: "#FFFFFF" },
  { id: 5, hex: "#FFFFFF" },
  { id: 6, hex: "#FFFFFF" },
  { id: 7, hex: "#FFFFFF" },
  { id: 8, hex: "#FFFFFF" },
  { id: 9, hex: "#FFFFFF" },
  { id: 10, hex: "#FFFFFF" },
  { id: 11, hex: "#FFFFFF" },
  { id: 12, hex: "#FFFFFF" },
  { id: 13, hex: "#FFFFFF" },
  { id: 14, hex: "#FFFFFF" },
  { id: 15, hex: "#FFFFFF" },
  { id: 16, hex: "#FFFFFF" },
];

const CellEditModal: VFC<Props> = (props) => {
  const { isVisible, onClose, activeCellId } = props;

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editablePixelsData, setEditablePixelsData] = useState(editablePixels);
  const [currentHex, setCurrentHex] = useState<string>("#fff");
  const [isColorModeActive, setIsColorModeActive] = useState<boolean>(true);

  const handleColorClick = (hex: string) => {
    setCurrentHex(hex);
  };

  const toggleIsEdit = useCallback(() => {
    setIsEdit((prev) => !prev);
  }, []);

  const handleSavePixelsData = () => {
    let pixelsDataForBackend = "";

    if (isEdit) {
      for (let i = 0; i < editablePixelsData.length; i++) {
        pixelsDataForBackend += editablePixelsData[i].hex;
      }

      console.log(pixelsDataForBackend);

      toggleIsEdit();
      message.success("Successful editing!");

      return;
    }

    toggleIsEdit();
    return pixelsDataForBackend;
  };

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <Wrapper>
        <CloseBtn onClick={onClose}>Cancel</CloseBtn>
        <Title>
          EDIT MODE <span>(Cell: #{activeCellId})</span>
        </Title>
        <FlexWrapper>
          <CellEditPixels
            isEdit={isEdit}
            currentHex={currentHex}
            editablePixelsData={editablePixelsData}
            setEditablePixelsData={setEditablePixelsData}
          />
          <EditBlockWrapper>
            <SubEditMenu>
              <SubMenuItem
                isActive={isColorModeActive}
                onClick={() => setIsColorModeActive(true)}
              >
                COLOR
              </SubMenuItem>
              <SubMenuItem
                isActive={!isColorModeActive}
                onClick={() => setIsColorModeActive(false)}
              >
                INFO
              </SubMenuItem>
            </SubEditMenu>
            <EditBlock>
              {isColorModeActive ? (
                <CellEditColorBlock
                  isEdit={isEdit}
                  handleColorClick={handleColorClick}
                  currentHex={currentHex}
                  handleSavePixelsData={handleSavePixelsData}
                />
              ) : (
                <CellEditInfoBlock />
              )}
            </EditBlock>
          </EditBlockWrapper>
        </FlexWrapper>
      </Wrapper>
    </Modal>
  );
};

export default CellEditModal;
