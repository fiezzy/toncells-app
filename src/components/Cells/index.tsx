import { VFC, useContext, useState } from "react";
import { CellModalContext } from "../../context";
import { CELLS_AREA } from "../../constants/images";
import { Wrapper, CellsAreaImg } from "./style";
import CellModal from "../CellModal";

type CellsAreaType = {
  id: number;
  x: number;
  y: number;
};

const cellsCollection: CellsAreaType[] = [
  {
    id: 1,
    x: 1,
    y: 1,
  },
];

for (let x = 1; x < 26; x++) {
  for (let y = 1; y < 26; y++) {
    cellsCollection.push({
      id: 1,
      x: x,
      y: y,
    });
  }
}

cellsCollection.shift();
cellsCollection.forEach((cellsArea, idx) => (cellsArea.id += idx));

const Cells: VFC = () => {
  const { toggleCellModal, isCellModalActive } = useContext(CellModalContext);
  const [activeAreaData, setActiveAreaData] = useState({ id: 1, x: 1, y: 1 });

  const handleClick = (id: number, x: number, y: number) => {
    toggleCellModal();

    setActiveAreaData({
      id: id,
      x: x,
      y: y,
    });
  };

  return (
    <>
      <Wrapper>
        {cellsCollection.map(({ id, x, y }) => (
          <>
            <CellsAreaImg
              key={id}
              src={CELLS_AREA}
              alt="#"
              onClick={() => handleClick(id, x, y)}
            />
          </>
        ))}
      </Wrapper>
      <CellModal
        isVisible={isCellModalActive}
        onClose={toggleCellModal}
        id={activeAreaData.id}
        locationX={activeAreaData.x}
        locationY={activeAreaData.y}
      />
    </>
  );
};

export default Cells;
