import {
  VFC,
  useContext,
  useState,
  useCallback,
  useEffect,
  Fragment,
} from "react";
import { CellModalContext } from "../../context";
import { Wrapper } from "./style";
import CellModalDefault from "../CellModalDefault";
import CellModalBuy from "../CellModalBuy";
import CellModalEdit from "../CellModalEdit";
import CellAreaSmall from "./CellsAreaSmall";

// const EDITABLE_CELL_ID = 6;

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
  const [locationZ, setLocationZ] = useState<number>(0);
  const [cellsData, setCellsData] = useState();
  // const [cellsAreaData, setCellsAreaData] = useState<any[]>([]);

  const toggleBuyMode = useCallback(() => {
    setIsBuyMode((prev) => !prev);
  }, []);

  // const toggleEditMode = useCallback(() => {
  //   setIsEditMode((prev) => !prev);

  //   if (activeCellId === EDITABLE_CELL_ID && !isEditMode) {
  //     setIsBuyMode(false);
  //   }
  // }, [activeCellId, isEditMode]);

  const handleCellsAreaClick = (
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

  const handleCellClick = useCallback((locationZ: number, id: number) => {
    setLocationZ(locationZ);
    setActiveCellId(id);

    // if (locationZ === EDITABLE_CELL_ID) {
    //   setIsEditMode(true);
    // }
  }, []);

  useEffect(() => {
    try {
      fetch("data.json")
        .then((res) => res.json())
        .then((data) => setCellsData(data));
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }, []);

  const activeAreaCollection: any[] = [];

  for (
    let id = activeAreaData.firstCellId!;
    id < activeAreaData.lastCellId! + 1;
    id++
  ) {
    activeAreaCollection.push({
      id: id,
    });
  }

  return (
    <>
      <Wrapper>
        {cellsCollection.map(({ id, x, y, firstCellId, lastCellId }) => (
          <div
            key={id}
            onClick={() =>
              handleCellsAreaClick(id, x, y, firstCellId, lastCellId)
            }
          >
            <CellAreaSmall
              key={id}
              firstCellId={firstCellId!}
              lastCellId={lastCellId!}
            />
          </div>
        ))}
      </Wrapper>
      {/* {isEditMode ? (
        <CellModalEdit
          isVisible={isCellModalActive}
          locationX={activeAreaData.x}
          locationY={activeAreaData.y}
          activeCellId={activeCellId}
          onClose={toggleEditMode}
        /> */}
      {isBuyMode ? (
        <CellModalBuy
          isVisible={isCellModalActive}
          onClose={toggleCellModal}
          id={activeAreaData.id}
          locationX={activeAreaData.x}
          locationY={activeAreaData.y}
          locationZ={locationZ}
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
          activeAreaCollection={activeAreaCollection}
        />
      )}
    </>
  );
};

export default Cells;
