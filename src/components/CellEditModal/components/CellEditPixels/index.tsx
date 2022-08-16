import { VFC } from "react";
import { Color } from "react-color-palette";
import { PixelType } from "../../types";
import { Wrapper, EditablePixel } from "./style";

type Props = {
  isEdit: boolean;
  currentHex: string;
  editablePixelsData: PixelType[];
  setEditablePixelsData: (pixelData: any) => void;
};

const CellEditArea: VFC<Props> = (props) => {
  const { currentHex, editablePixelsData, setEditablePixelsData, isEdit } =
    props;

  const handleEditablePixelClick = (clickedPixelId: number) => {
    setEditablePixelsData((prev: PixelType[]) =>
      prev.map((pixel: PixelType) => {
        if (pixel.id === clickedPixelId) {
          return {
            id: pixel.id,
            hex: currentHex,
          };
        }

        return pixel;
      })
    );
  };

  return (
    <Wrapper isEdit={isEdit}>
      {editablePixelsData.map(({ id, hex }) => (
        <EditablePixel
          isEdit={isEdit}
          key={id}
          onClick={() => isEdit && handleEditablePixelClick(id)}
          hex={hex}
        />
      ))}
    </Wrapper>
  );
};

export default CellEditArea;
