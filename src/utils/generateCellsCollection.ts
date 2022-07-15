import { App } from "../typings";

export const generateCellsCollection = (): App.CellsAreaType[] => {
  const cellsCollection: App.CellsAreaType[] = [
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

  return cellsCollection;
};
