import { VFC } from "react";
import { Color, ColorPicker, useColor } from "react-color-palette";
import { colorsArrV2 } from "../../colors";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  ColorsWrapper,
  ColorBlock,
  Label,
  SaveBtn,
  CurrentColorWrapper,
  CurrentColorBlock,
} from "./style";

type Props = {
  isEdit: boolean;
  currentHex: string;
  handleSavePixelsData: () => void;
  isGettingSignature: boolean;
  setCurrentHex: (hex: any) => void;
};

const CellEditColorBlock: VFC<Props> = (props) => {
  const {
    isEdit,
    currentHex,
    handleSavePixelsData,
    isGettingSignature,
    setCurrentHex,
  } = props;

  const [color, setColor] = useColor("hex", currentHex);

  // console.log(color);

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
          </CurrentColorWrapper>
        )}
      </div>

      {isGettingSignature ? (
        <SaveBtn>
          <Spin indicator={<LoadingOutlined />} style={{ color: "#fff" }} />
        </SaveBtn>
      ) : (
        <SaveBtn onClick={handleSavePixelsData}>
          {isEdit ? "SAVE" : "EDIT"}
        </SaveBtn>
      )}
    </>
  );
};

export default CellEditColorBlock;
