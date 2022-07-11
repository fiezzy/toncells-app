import { VFC, useState, useCallback } from "react";
import { Modal } from "../Modal";
import CellEditPixels from "./components/CellEditPixels";
import CellEditColorBlock from "./components/CellEditColorBlock";
import CellEditInfoBlock from "./components/CellEditInfoBlock";
import { asciiToHex } from "../../utils/asciiToHex";
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
  tonWalletAddress: string;
};

const generateEditSignHexString = (
  cellId: number,
  walletAddress: string
): string => {
  let editSignString = `Edit Cell #${cellId} by ${walletAddress} wallet`;
  console.log(editSignString);

  let editSignHexString = asciiToHex(editSignString);
  console.log(editSignHexString);

  return editSignHexString;
};

const initialInfoData = [
  {
    id: "tgName",
    value: "toncells",
    label: "TELEGRAM NAME:",
    placeholder: "@name",
    link: "https://t.me/",
  },
  {
    id: "link",
    value: "https://app.toncells.org/",
    label: "LINK:",
    placeholder: "https://name.com",
    link: "https://t.me/",
  },
  {
    id: "description",
    value:
      "This item gives you an access to edit cell #260 of TonCells Project. TonCells is a 100x100 celled field where each cell can be edited. Make your unique NFT even more unique by customizing it how you want. Draw, add pictures & videos, edit your own description and mainly do whatever you want! This item gives you x% discount for the next purchase. / This item doesn't give you any discount.",
    label: "DESCRIPTION:",
    placeholder: "write your description in this field",
  },
];

const editablePixels: PixelType[] = [];

for (let i = 1; i < 257; i++) {
  editablePixels.push({ id: i, hex: "#FFFFFF" });
}

let initialHexData = "";

for (let i = 0; i < editablePixels.length; i++) {
  initialHexData += editablePixels[i].hex;
}

const CellEditModal: VFC<Props> = (props) => {
  const { isVisible, onClose, activeCellId, tonWalletAddress } = props;

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editablePixelsData, setEditablePixelsData] = useState(editablePixels);
  const [currentHex, setCurrentHex] = useState<string>("#fff");
  const [isColorModeActive, setIsColorModeActive] = useState<boolean>(true);
  const [editableInfoData, setEditableInfoData] = useState(initialInfoData);

  const [hexPixelsData, setHexPixelsData] = useState<string>(initialHexData);

  const [fullEditData, setFullEditData] = useState<any>({
    ids: [activeCellId],
    signature: "",
    wallet: tonWalletAddress,
    image: hexPixelsData,
    username: editableInfoData[0].value,
    text: editableInfoData[2].value,
    link: editableInfoData[1].value,
  });

  const tonProvider = (window as any).ton;

  const handleColorClick = (hex: string) => {
    setCurrentHex(hex);
  };

  const toggleIsEdit = useCallback(() => {
    setIsEdit((prev) => !prev);
  }, []);

  const getEditSignature = async () => {
    const hexSignEditData = generateEditSignHexString(
      activeCellId,
      tonWalletAddress
    );

    if (tonProvider) {
      try {
        const editSignature = await tonProvider.send("ton_rawSign", [
          {
            data: hexSignEditData,
          },
        ]);

        return editSignature;
      } catch (error) {
        console.log(error);
      }
    } else {
      message.error("Please, install a ton wallet extension");
    }
  };

  const handleSavePixelsData = async () => {
    let pixelsDataForBackend = "";

    if (isEdit) {
      for (let i = 0; i < editablePixelsData.length; i++) {
        pixelsDataForBackend += editablePixelsData[i].hex;
      }

      setHexPixelsData(pixelsDataForBackend);

      const reveivedSignature = await getEditSignature();

      setFullEditData({
        ...fullEditData,
        image: pixelsDataForBackend,
        signature: reveivedSignature,
      });

      toggleIsEdit();
      message.success("Successful editing!");
      return;
    }

    toggleIsEdit();
  };

  const handleSaveInfoData = () => {
    setFullEditData({
      ...fullEditData,
      username: editableInfoData[0].value,
      text: editableInfoData[2].value,
      link: editableInfoData[1].value,
    });
  };

  console.log(fullEditData);

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
                <CellEditInfoBlock
                  editableInfoData={editableInfoData}
                  setEditableInfoData={setEditableInfoData}
                  handleSaveInfoData={handleSaveInfoData}
                />
              )}
            </EditBlock>
          </EditBlockWrapper>
        </FlexWrapper>
      </Wrapper>
    </Modal>
  );
};

export default CellEditModal;
