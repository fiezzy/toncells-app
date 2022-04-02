import { VFC, useContext, useState, useCallback } from "react";
import { CellModalContext } from "../../context";
import { CELLS_AREA } from "../../constants/images";
import { Wrapper, CellsAreaImg } from "./style";
import CellModalDefault from "../CellModalDefault";
import CellModalBuy from "../CellModalBuy";
import CellModalEdit from "../CellModalEdit";

const EDITABLE_CELL_ID = 6;

type CellsAreaType = {
  id: number;
  x: number;
  y: number;
  lastCellId?: number;
  firstCellId?: number;
};

const cellsCollection: CellsAreaType[] = [
  {
    id: 1,
    x: 1,
    y: 1,
    lastCellId: 16,
    firstCellId: 1,
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
cellsCollection.forEach((cellsArea, idx) => {
  cellsArea.id += idx;
  cellsArea.lastCellId = cellsArea.id * 16;
  cellsArea.firstCellId = cellsArea.lastCellId - 16 + 1;
});

const Cells: VFC = () => {
  const { toggleCellModal, isCellModalActive } = useContext(CellModalContext);
  const [activeAreaData, setActiveAreaData] = useState<CellsAreaType>({
    id: 1,
    x: 1,
    y: 1,
    firstCellId: 1,
    lastCellId: 16,
  });
  const [isBuyMode, setIsBuyMode] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [activeCellId, setActiveCellId] = useState<number>(0);

  const handleClick = (
    id: number,
    x: number,
    y: number,
    firstCellId?: number,
    lastCellId?: number
  ) => {
    toggleCellModal();

    setActiveAreaData({
      id: id,
      x: x,
      y: y,
      firstCellId: firstCellId!,
      lastCellId: lastCellId!,
    });
  };

  const toggleBuyMode = useCallback(() => {
    setIsBuyMode((prev) => !prev);
  }, []);

  const toggleEditMode = useCallback(() => {
    setIsEditMode((prev) => !prev);

    if (activeCellId === EDITABLE_CELL_ID && !isEditMode) {
      setIsBuyMode(false);
    }
  }, []);

  const handleCellClick = useCallback((id: number) => {
    setActiveCellId(id);

    if (id === EDITABLE_CELL_ID) {
      setIsEditMode(true);
    }
  }, []);

  console.log(isEditMode);

  return (
    <>
      <Wrapper>
        {cellsCollection.map(({ id, x, y, firstCellId, lastCellId }) => (
          <CellsAreaImg
            key={id}
            src={CELLS_AREA}
            alt="#"
            onClick={() => handleClick(id, x, y, firstCellId, lastCellId)}
          />
        ))}
      </Wrapper>
      {isEditMode ? (
        <CellModalEdit
          isVisible={isCellModalActive}
          locationX={activeAreaData.x}
          locationY={activeAreaData.y}
          activeCellId={activeCellId}
          onClose={toggleEditMode}
        />
      ) : isBuyMode ? (
        <CellModalBuy
          isVisible={isCellModalActive}
          onClose={toggleCellModal}
          id={activeAreaData.id}
          locationX={activeAreaData.x}
          locationY={activeAreaData.y}
          toggleBuyMode={toggleBuyMode}
          activeCellId={activeCellId}
        />
      ) : (
        <CellModalDefault
          isVisible={isCellModalActive}
          onClose={toggleCellModal}
          id={activeAreaData.id}
          locationX={activeAreaData.x}
          locationY={activeAreaData.y}
          firstCellId={activeAreaData.firstCellId!}
          lastCellId={activeAreaData.lastCellId!}
          toggleBuyMode={toggleBuyMode}
          handleCellClick={handleCellClick}
        />
      )}
    </>
  );
};

export default Cells;
