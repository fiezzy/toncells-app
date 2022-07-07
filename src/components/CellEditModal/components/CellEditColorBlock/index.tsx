import { VFC } from "react";
import { colorsArr } from "../../colors";
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
};

const CellEditColorBlock: VFC<Props> = (props) => {
  const { isEdit, handleColorClick, currentHex, handleSavePixelsData } = props;

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
      <SaveBtn onClick={handleSavePixelsData}>
        {isEdit ? "SAVE" : "EDIT"}
      </SaveBtn>
    </>
  );
};

export default CellEditColorBlock;
