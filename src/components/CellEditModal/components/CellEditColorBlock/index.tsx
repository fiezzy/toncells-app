import { VFC } from "react";
import { colorsArr } from "../../colors";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  ColorsWrapper,
  ColorBlock,
  Label,
  SaveBtn,
  CurrentColorWrapper,
} from "./style";

type Props = {
  isEdit: boolean;
  handleColorClick: (hex: string) => void;
  currentHex: string;
  handleSavePixelsData: () => void;
  isGettingSignature: boolean;
};

const CellEditColorBlock: VFC<Props> = (props) => {
  const {
    isEdit,
    handleColorClick,
    currentHex,
    handleSavePixelsData,
    isGettingSignature,
  } = props;

  return (
    <>
      <ColorsWrapper isEdit={isEdit}>
        {colorsArr.map(({ id, hex }) => (
          <ColorBlock
            isEdit={isEdit}
            key={id}
            color={hex}
            onClick={() => {
              if (isEdit) {
                handleColorClick(hex);
              }
            }}
          />
        ))}
      </ColorsWrapper>
      {isEdit && (
        <CurrentColorWrapper>
          <Label>CURRENT COLOR:</Label>
          <ColorBlock
            color={currentHex}
            style={{ width: "20px", height: "20px" }}
          />
        </CurrentColorWrapper>
      )}
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
