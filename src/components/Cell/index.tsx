import { VFC } from "react";
import { Wrapper } from "./style";

type Props = {
  className?: string;
  handleClick: (id: number) => void;
  id: number;
};

const Cell: VFC<Props> = (props) => {
  const { handleClick, id, className } = props;

  return <Wrapper className={className} onClick={() => handleClick(id)} />;
};

export default Cell;
