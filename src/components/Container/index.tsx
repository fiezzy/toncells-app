import { FC } from "react";
import { Wrapper } from "./style";

const Container: FC = (props) => {
  const { children } = props;

  return <Wrapper>{children}</Wrapper>;
};

export default Container;
