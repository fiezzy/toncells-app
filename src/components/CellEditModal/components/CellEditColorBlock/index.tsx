import { VFC } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import { Spin } from "antd";
import {
  LoadingOutlined,
  ClearOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  ColorsWrapper,
  SaveBtn,
  CurrentColorWrapper,
  CurrentColorBlock,
  ClearAllBtn,
} from "./style";

type Props = {
  isEdit: boolean;
  currentHex: string;
  handleSavePixelsData: () => void;
  isGettingSignature: boolean;
  setCurrentHex: (hex: any) => void;
  clearAllImage: () => void;
  copyImage: () => void;
  pasteImage: () => void;
};

const CellEditColorBlock: VFC<Props> = (props) => {
  const {
    isEdit,
    currentHex,
    handleSavePixelsData,
    isGettingSignature,
    setCurrentHex,
    clearAllImage,
    copyImage,
    pasteImage,
  } = props;

  const [color, setColor] = useColor("hex", currentHex);

  // console.log(color);

  const hasCopiedImage =
    localStorage.getItem("copiedImage") !== null &&
    localStorage.getItem("copiedImage") !== undefined;

  console.log(hasCopiedImage);

  return (
    <>
      <div>
        <ColorsWrapper isEdit={isEdit}>
          {isEdit ? (
            <ColorPicker
              width={322}
              height={150}
              color={color}
              onChange={isEdit ? setColor : () => {}}
              onChangeComplete={
                isEdit ? (color) => setCurrentHex(color.hex) : () => {}
              }
              hideRGB
              hideHSV
            />
          ) : (
            <ColorPicker
              width={322}
              height={150}
              color={color}
              onChange={isEdit ? setColor : () => {}}
              onChangeComplete={
                isEdit ? (color) => setCurrentHex(color.hex) : () => {}
              }
              hideRGB
              hideHSV
              hideHEX
            />
          )}
        </ColorsWrapper>
        {isEdit && (
          <CurrentColorWrapper>
            <CurrentColorBlock color={currentHex} />
            <ClearAllBtn onClick={clearAllImage}>
              <ClearOutlined />
            </ClearAllBtn>
          </CurrentColorWrapper>
        )}
      </div>

      {isGettingSignature ? (
        <SaveBtn color={currentHex} isGettingSignature={isGettingSignature}>
          <Spin indicator={<LoadingOutlined />} style={{ color: "#000" }} />
        </SaveBtn>
      ) : (
        <>
          {!isEdit && (
            <SaveBtn disabled={true} color={currentHex}>
              <UploadOutlined />
              UPLOAD IMAGE
            </SaveBtn>
          )}

          {!isEdit && (
            <SaveBtn
              color={currentHex}
              onClick={hasCopiedImage ? pasteImage : copyImage}
            >
              {hasCopiedImage ? "PASTE" : "COPY"}
            </SaveBtn>
          )}

          <SaveBtn onClick={handleSavePixelsData} color={currentHex}>
            {isEdit ? "SAVE" : "EDIT"}
          </SaveBtn>
        </>
      )}
    </>
  );
};

export default CellEditColorBlock;
