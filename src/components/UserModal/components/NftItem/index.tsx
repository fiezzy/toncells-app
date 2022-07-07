import { VFC } from "react";
import { Wrapper, BottomBlock, BtnsWrapper, Button } from "./style";

type Props = {
  cellId: number;
};

const UserItem: VFC<Props> = (props) => {
  const { cellId } = props;

  return <Wrapper>Cell: #{cellId}</Wrapper>;
};

export default UserItem;
