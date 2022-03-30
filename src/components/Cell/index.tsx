import { VFC } from "react";
import { Wrapper } from "./style";

type Props = {
  handleClick: (id: number) => void;
  id: number;
};

const Cell: VFC<Props> = (props) => {
  const { handleClick, id } = props;

  return <Wrapper onClick={() => handleClick(id)} />;
};

export default Cell;
