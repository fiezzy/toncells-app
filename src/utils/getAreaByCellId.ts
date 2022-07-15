import { App } from "../typings";

export const getAreaByCellId = (
  cellId: number,
  cellsCollection: App.CellsAreaType[]
) => {
  let currentArea: any = null;

  for (let i = 0; i < cellsCollection.length; i++) {
    let first = cellsCollection[i].firstCellId!;
    let last = cellsCollection[i].lastCellId!;

    for (let j = first; j < last + 1; j++) {
      if (j === cellId) {
        currentArea = cellsCollection[i];
        break;
      }
    }

    if (currentArea !== null) {
      break;
    }
  }

  return currentArea;
};
