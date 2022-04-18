import { VFC } from "react";
import { Wrapper } from "./style";

type Props = {
  className?: string;
  handleClick: (id: number) => void;
  id: number;
  onMouseOver: any;
  onMouseOut?: any;
  selectedCells: any;
  cellId: number;
  // isSelected: boolean;
};

const Cell: VFC<any> = (props) => {
  const {
    handleClick,
    id,
    cellId,
    className,
    onMouseOver,
    onMouseOut,
    selectedCells,
  } = props;
  console.log(selectedCells);
  console.log(id);
  console.log(!!selectedCells.filter((e: number) => e === cellId)[0]);
  return (
    <Wrapper
      className={className}
      onClick={() => handleClick(id)}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      selected={!!selectedCells.filter((e: number) => e === cellId)[0]}
    />
  );
};

export default Cell;
