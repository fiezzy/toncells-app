import { VFC, useState, useCallback, useEffect } from "react";
import { Modal } from "../Modal";
import CellEditPixels from "./components/CellEditPixels";
import CellEditColorBlock from "./components/CellEditColorBlock";
import CellEditInfoBlock from "./components/CellEditInfoBlock";
import { ApiUpdateCellData } from "../../constants/index";
import { asciiToHex } from "../../utils/asciiToHex";
import { message } from "antd";
import WarningBlock from "../WarningBlock";
import {
  Wrapper,
  Title,
  CloseBtn,
  FlexWrapper,
  EditBlock,
  SubEditMenu,
  SubMenuItem,
  EditBlockWrapper,
  WarningWrapper,
  DiscardChangesBtn,
} from "./style";
import "react-color-palette/lib/css/styles.css";

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
  let editSignString = `Edit Cell #${[cellId].join(
    ", #"
  )} by ${walletAddress} wallet`;
  // console.log(editSignString);

  let editSignHexString = asciiToHex(editSignString);
  // console.log(editSignHexString);

  return editSignHexString;
};

const getInitialInfoData = (
  userName: string,
  link: string,
  description: string
) => [
  {
    id: "tgName",
    value: userName,
    label: "TELEGRAM NAME:",
    placeholder: "name",
    link: "https://t.me/",
  },
  {
    id: "link",
    value: link,
    label: "LINK:",
    placeholder: "https://name.com",
    link: "https://t.me/",
  },
  {
    id: "description",
    value: description,
    label: "DESCRIPTION:",
    placeholder: "write your description in this field",
  },
];

const getEditablePixels = (hexColorsString: string) => {
  const editablePixels: any[] = [];

  const minted =
    "#1AB90C#1AB90C#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#1AB90C#1AB90C#1AB90C#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#1AB90C#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#1AB90C#1AB90C#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#1AB90C#1AB90C#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#1AB90C#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#1AB90C#1AB90C#1AB90C#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#1AB90C#1AB90C";
  const payed =
    "#00AEE9#00AEE9#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#00AEE9#00AEE9#00AEE9#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#00AEE9#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#00AEE9#00AEE9#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#00AEE9#00AEE9#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#00AEE9#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#00AEE9#00AEE9#00AEE9#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#00AEE9#00AEE9";
  const reserve =
    "#DD0202#DD0202#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#DD0202#DD0202#DD0202#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#DD0202#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#DD0202#DD0202#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#DD0202#DD0202#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#DD0202#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#DD0202#DD0202#DD0202#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#DD0202#DD0202";

  if (
    hexColorsString &&
    hexColorsString.length > 1 &&
    hexColorsString !== minted &&
    hexColorsString !== payed &&
    hexColorsString !== reserve
  ) {
    const hexColorsArr = hexColorsString.match(/.{1,7}/g);

    for (let i = 0; i < hexColorsArr!.length; i++) {
      editablePixels.push({
        id: i + 1,
        hex: hexColorsArr![i],
      });
    }

    return editablePixels;
  }

  for (let i = 0; i < 256; i++) {
    editablePixels.push({
      id: i + 1,
      hex: "#FFFFFF",
    });
  }

  return editablePixels;
};

const CellEditModal: VFC<Props> = (props) => {
  const { isVisible, onClose, activeCellId, tonWalletAddress, actualCellData } =
    props;

  const imageInLocalStorage = localStorage.getItem("image");

  const [isPixelsEdit, setPixelsIsEdit] = useState<boolean>(false);
  const [isInfoEdit, setIsInfoEdit] = useState<boolean>(false);
  const [isColorModeActive, setIsColorModeActive] = useState<boolean>(true);
  const [editableInfoData, setEditableInfoData] = useState(
    actualCellData &&
      getInitialInfoData(
        actualCellData.Username,
        actualCellData.Link,
        actualCellData.Text
      )
  );
  const [currentHex, setCurrentHex] = useState("#000000");
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
  const [isHaveLocalChanges, setIsHaveLocalChanges] = useState<boolean>(false);

  const [editablePixelsData, setEditablePixelsData] = useState(
    actualCellData && getEditablePixels(actualCellData.Image)
  );

  useEffect(() => {
    if (imageInLocalStorage !== undefined && imageInLocalStorage !== null) {
      if (imageInLocalStorage === actualCellData.Image) {
        setIsHaveLocalChanges(false);

        return;
      }

      const idImageInLocalStorage = localStorage.getItem("imageId");

      if (+idImageInLocalStorage! === activeCellId) {
        setIsHaveLocalChanges(true);

        const finishedImgInStore: any[] = [];

        const imageColorsArr = imageInLocalStorage.match(/.{1,7}/g);

        for (let i = 0; i < imageColorsArr!.length; i++) {
          finishedImgInStore.push({
            id: i + 1,
            hex: imageColorsArr![i],
          });
        }

        setEditablePixelsData(finishedImgInStore);

        return;
      }

      console.log(`${idImageInLocalStorage}, ${activeCellId}`);

      setIsHaveLocalChanges(false);

      return;
    }

    setIsHaveLocalChanges(false);
  }, [activeCellId, imageInLocalStorage]);

  // console.log(actualCellData);

  const [isGettingSignature, setIsGettingSignature] = useState<boolean>(false);

  const tonProvider = (window as any).ton;

  const handleSetCurrentHex = useCallback((hex: any) => {
    setCurrentHex(hex);
  }, []);

  const toggleIsPixelsEdit = useCallback(() => {
    setPixelsIsEdit((prev) => !prev);
  }, []);

  const toggleIsInfoEdit = useCallback(() => {
    setIsInfoEdit((prev) => !prev);
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(ApiUpdateCellData, requestOptions);

    return await response.json();
  };

  const getEditSignAndPublicKey = async () => {
    setIsGettingSignature(true);

    const receivedSignature = await getEditSignature();

    const walletInfo = await tonProvider.send("ton_requestWallets");
    const publicKey = walletInfo[0].publicKey;

    setIsGettingSignature(false);
    return { receivedSignature, publicKey };
  };

  // console.log(isGettingSignature);

  const handleSavePixelsData = async () => {
    let pixelsDataForBackend = "";

    if (isPixelsEdit) {
      for (let i = 0; i < editablePixelsData.length; i++) {
        pixelsDataForBackend += editablePixelsData[i].hex;
      }

      localStorage.setItem("imageId", activeCellId.toString());
      localStorage.setItem("image", pixelsDataForBackend);
      // setIsHaveLocalChanges(true);

      if (pixelsDataForBackend === actualCellData.Image) {
        toggleIsPixelsEdit();

        return;
      }

      if (fullEditData.signature !== "" && fullEditData.publicKey !== "") {
        setFullEditData((prev: any) => ({
          ...prev,
          image: pixelsDataForBackend,
        }));

        return;
      }

      const { receivedSignature, publicKey } = await getEditSignAndPublicKey();

      setFullEditData((prev: any) => ({
        ...prev,
        image: pixelsDataForBackend,
        signature: receivedSignature,
        publicKey: publicKey,
      }));

      return;
    }

    toggleIsPixelsEdit();
  };

  useEffect(() => {
    (async () => {
      if (isPixelsEdit) {
        try {
          const { status } = await createUpdateCellDataRequest(fullEditData);

          if (status === "ok") {
            localStorage.removeItem("imageId");
            localStorage.removeItem("image");

            setIsHaveLocalChanges(false);

            toggleIsPixelsEdit();
            message.success("Successful editing!");
          }
        } catch (error) {
          toggleIsPixelsEdit();
          message.error("Error!");
          console.log(error);
        }

        console.log(fullEditData);
      }
    })();
  }, [fullEditData]);

  // console.log("Is ready to fetch:", isReadyToFetch);

  const handleSaveInfoData = async () => {
    if (isInfoEdit) {
      if (
        actualCellData.Username === editableInfoData[0].value &&
        actualCellData.Text === editableInfoData[2].value &&
        actualCellData.Link === editableInfoData[1].value
      ) {
        toggleIsInfoEdit();
        return;
      }

      if (fullEditData.signature !== "" && fullEditData.publicKey !== "") {
        setFullEditData({
          ...fullEditData,
          username: editableInfoData[0].value,
          text: editableInfoData[2].value,
          link: editableInfoData[1].value,
        });

        return;
      }

      const { receivedSignature, publicKey } = await getEditSignAndPublicKey();

      setFullEditData({
        ...fullEditData,
        signature: receivedSignature,
        publicKey: publicKey,
        username: editableInfoData[0].value,
        text: editableInfoData[2].value,
        link: editableInfoData[1].value,
      });

      return;
    }

    toggleIsInfoEdit();
  };

  const handleCancelBtnClick = () => {
    if (isPixelsEdit) {
      if (isGettingSignature && fullEditData.signature === "") {
        setIsGettingSignature(false);
        toggleIsPixelsEdit();
        message.error("Whoops, try sign the signature again");
        setIsHaveLocalChanges(true);
      }

      toggleIsPixelsEdit();

      return;
    }

    if (isInfoEdit) {
      if (isGettingSignature && fullEditData.signature === "") {
        setIsGettingSignature(false);
        toggleIsInfoEdit();
        message.error("Whoops, try sign the signature again");
      }

      toggleIsInfoEdit();

      return;
    }

    onClose();
  };

  useEffect(() => {
    (async () => {
      if (isInfoEdit) {
        try {
          const { status } = await createUpdateCellDataRequest(fullEditData);

          if (status === "ok") {
            toggleIsInfoEdit();
            message.success("Successful editing!");
          }
        } catch (error) {
          toggleIsInfoEdit();
          message.error("Error!");
          console.log(error);
        }

        console.log(fullEditData);
      }
    })();
  }, [fullEditData]);

  const handleSubMenuItemClick = (type: string) => {
    switch (type) {
      case "color":
        if (isInfoEdit) {
          toggleIsInfoEdit();
        }
        setIsColorModeActive(true);
        break;
      case "info":
        if (isPixelsEdit) {
          toggleIsPixelsEdit();
        }
        setIsColorModeActive(false);
        break;
      default:
        break;
    }
  };

  const handleDiscadLocalChangesClick = () => {
    setIsHaveLocalChanges(false);

    localStorage.removeItem("imageId");
    localStorage.removeItem("image");

    setEditablePixelsData(
      actualCellData && getEditablePixels(actualCellData.Image)
    );
  };

  const handleClearAllBtnClick = useCallback(() => {
    const clearedImage = [];

    for (let i = 0; i < 256; i++) {
      clearedImage.push({
        id: i + 1,
        hex: "#FFFFFF",
      });
    }

    setEditablePixelsData(clearedImage);
  }, []);

  const copiedImage = localStorage.getItem("copiedImage");

  const handleCopyImageClick = useCallback(() => {
    localStorage.setItem("copiedImage", actualCellData.Image);
    message.success("You have successfully copied the image!");
  }, []);

  const handlePasteImageClick = useCallback(() => {
    if (copiedImage !== null && copiedImage !== undefined) {
      toggleIsPixelsEdit();
      setEditablePixelsData(getEditablePixels(copiedImage));
      localStorage.removeItem("copiedImage");
      return;
    }
  }, []);

  console.log(isHaveLocalChanges);

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <Wrapper isEdit={isPixelsEdit || isInfoEdit}>
        <CloseBtn onClick={handleCancelBtnClick}>Cancel</CloseBtn>
        <Title>
          EDIT MODE <span>(Cell: #{activeCellId})</span>
        </Title>
        <FlexWrapper>
          <EditBlockWrapper>
            <CellEditPixels
              isEdit={isPixelsEdit}
              currentHex={currentHex}
              editablePixelsData={editablePixelsData}
              setEditablePixelsData={setEditablePixelsData}
            />
            {isHaveLocalChanges && (
              <WarningWrapper>
                <WarningBlock label="You have local changes, resave to update the image on the server or discard them." />
                <DiscardChangesBtn onClick={handleDiscadLocalChangesClick}>
                  Discard local changes
                </DiscardChangesBtn>
              </WarningWrapper>
            )}
          </EditBlockWrapper>
          <EditBlockWrapper>
            <SubEditMenu>
              <SubMenuItem
                isActive={isColorModeActive}
                onClick={() => handleSubMenuItemClick("color")}
              >
                COLOR
              </SubMenuItem>
              <SubMenuItem
                isActive={!isColorModeActive}
                onClick={() => handleSubMenuItemClick("info")}
              >
                INFO
              </SubMenuItem>
            </SubEditMenu>
            <EditBlock>
              {isColorModeActive ? (
                <CellEditColorBlock
                  isEdit={isPixelsEdit}
                  currentHex={currentHex}
                  handleSavePixelsData={handleSavePixelsData}
                  isGettingSignature={isGettingSignature}
                  setCurrentHex={handleSetCurrentHex}
                  clearAllImage={handleClearAllBtnClick}
                  copyImage={handleCopyImageClick}
                  pasteImage={handlePasteImageClick}
                />
              ) : (
                <CellEditInfoBlock
                  isEdit={isInfoEdit}
                  editableInfoData={editableInfoData}
                  setEditableInfoData={setEditableInfoData}
                  handleSaveInfoData={handleSaveInfoData}
                  isGettingSignature={isGettingSignature}
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
