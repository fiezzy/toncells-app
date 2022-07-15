import { VFC } from "react";
import { Wrapper, BottomBlock, BtnsWrapper, Button } from "./style";

type Props = {
  cellId: number;
  handleNftItemClick: () => void;
};

const UserItem: VFC<Props> = (props) => {
  const { cellId, handleNftItemClick } = props;

  return <Wrapper onClick={handleNftItemClick}>Cell: #{cellId}</Wrapper>;
};

export default UserItem;
