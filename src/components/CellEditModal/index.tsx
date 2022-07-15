import { VFC, useState, useCallback } from "react";
import { Modal } from "../Modal";
import CellEditPixels from "./components/CellEditPixels";
import CellEditColorBlock from "./components/CellEditColorBlock";
import CellEditInfoBlock from "./components/CellEditInfoBlock";
import { ApiUpdateCellData } from "../../constants/index";
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
  actualCellData: any;
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
  const { isVisible, onClose, activeCellId, tonWalletAddress, actualCellData } =
    props;

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editablePixelsData, setEditablePixelsData] = useState(editablePixels);
  const [currentHex, setCurrentHex] = useState<string>("#fff");
  const [isColorModeActive, setIsColorModeActive] = useState<boolean>(true);
  const [editableInfoData, setEditableInfoData] = useState(initialInfoData);

  console.log(actualCellData);

  const [hexPixelsData, setHexPixelsData] = useState<string>(initialHexData);

  const [fullEditData, setFullEditData] = useState<any>(
    actualCellData && {
      ids: [activeCellId],
      signature: "",
      wallet: tonWalletAddress,
      image: actualCellData.Image,
      username: actualCellData.Username,
      text: actualCellData.Text,
      link: actualCellData.Link,
      publicKey: "",
    }
  );

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

  const createUpdateCellDataRequest = async (data: any) => {
    const requestOptions: any = {
      method: "POST",
      body: JSON.stringify(data),
    };

    const response = await fetch(ApiUpdateCellData, requestOptions);

    return await response.json();
  };

  const handleSavePixelsData = async () => {
    let pixelsDataForBackend = "";

    if (isEdit) {
      for (let i = 0; i < editablePixelsData.length; i++) {
        pixelsDataForBackend += editablePixelsData[i].hex;
      }

      setHexPixelsData(pixelsDataForBackend);

      if (fullEditData.signature !== "" && fullEditData.publicKey !== "") {
        setFullEditData({
          ...fullEditData,
          image: pixelsDataForBackend,
        });

        try {
          const { status } = await createUpdateCellDataRequest(fullEditData);

          if (status === "success") {
            toggleIsEdit();
            message.success("Successful editing!");
          }
        } catch (error) {
          toggleIsEdit();
          message.error("Error!");
          console.log(error);
        }

        return;
      }

      const reveivedSignature = await getEditSignature();

      const walletInfo = await tonProvider.send("ton_requestWallets");

      setFullEditData({
        ...fullEditData,
        image: pixelsDataForBackend,
        signature: reveivedSignature,
        publicKey: walletInfo[0].publicKey,
      });

      try {
        const { status } = await createUpdateCellDataRequest(fullEditData);

        if (status === "success") {
          toggleIsEdit();
          message.success("Successful editing!");
        }
      } catch (error) {
        toggleIsEdit();
        message.error("Error!");
        console.log(error);
      }

      return;
    }

    toggleIsEdit();
  };

  const handleSaveInfoData = async () => {
    if (fullEditData.signature !== "" && fullEditData.publicKey !== "") {
      setFullEditData({
        ...fullEditData,
        username: editableInfoData[0].value,
        text: editableInfoData[2].value,
        link: editableInfoData[1].value,
      });

      try {
        const { status } = await createUpdateCellDataRequest(fullEditData);

        if (status === "success") {
          toggleIsEdit();
          message.success("Successful editing!");
        }
      } catch (error) {
        toggleIsEdit();
        message.error("Error!");
        console.log(error);
      }

      return;
    }

    const receivedSignature = await getEditSignature();

    const walletInfo = await tonProvider.send("ton_requestWallets");

    setFullEditData({
      ...fullEditData,
      signature: receivedSignature,
      publicKey: walletInfo[0].publicKey,
      username: editableInfoData[0].value,
      text: editableInfoData[2].value,
      link: editableInfoData[1].value,
    });

    try {
      const { status } = await createUpdateCellDataRequest(fullEditData);

      if (status === "success") {
        toggleIsEdit();
        message.success("Successful editing!");
      }
    } catch (error) {
      toggleIsEdit();
      message.error("Error!");
      console.log(error);
    }
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
