export namespace App {
  export type CellModalContext = {
    isCellModalActive: boolean;
    toggleCellModal: () => void;
    isCellEditMode: boolean;
    toggleCellEditMode: () => void;
  };

  export type CellsAreaType = {
    id: number;
    x: number;
    y: number;
    lastCellId?: number;
    firstCellId?: number;
  };
}
