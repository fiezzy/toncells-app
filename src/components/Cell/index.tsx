import { VFC } from "react";
import { Wrapper } from "./style";

type Props = {
  className?: string;
  handleClick: (isNotActive: boolean) => void;
  id: number;
  onMouseOver: any;
  onMouseOut?: any;
  selectedCells: any;
  cellId: number;
  currentMintedCells: any[];
  currentReservedCells: any[];
  isSelectMode: boolean;
  currentReservedCellsasf: any;
};

const Cell: VFC<Props> = (props) => {
  const {
    handleClick,
    id,
    cellId,
    className,
    onMouseOver,
    onMouseOut,
    selectedCells,
    currentMintedCells,
    currentReservedCells,
    currentReservedCellsasf,
    isSelectMode,
  } = props;

  const isMinted = currentMintedCells.filter((e: any) => e.ID === cellId)[0];
  const isReserved = currentReservedCells.filter(
    (e: any) => e.ID === cellId
  )[0];
  const isPayed = currentReservedCellsasf.filter(
    (e: any) => e.ID === cellId
  )[0];
  const isSelected = !!selectedCells.filter((e: number) => e === cellId)[0];

  const isNotActive = isMinted || isReserved;

  const isEdited = isMinted && isMinted.Image !== "";

  const statusOfCell = isMinted
    ? "minted"
    : isReserved
    ? "reserved"
    : isPayed
    ? "payed"
    : isSelected
    ? "selected"
    : "free";

  return (
    <Wrapper
      className={className}
      onClick={() => {
        handleClick(isNotActive);
      }}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      status={statusOfCell}
      isEdited={isEdited}
      isNotActive={isSelectMode && isNotActive}
    >
      <span>#{cellId}</span>
    </Wrapper>
  );
};

export default Cell;
