import { VFC } from "react";
import { Wrapper, WarningIcon, Label } from "./style";

type Props = {
  label: string;
};

const WarningBlock: VFC<Props> = (props) => {
  const { label } = props;

  return (
    <Wrapper>
      <WarningIcon />
      <Label>{label}</Label>
    </Wrapper>
  );
};

export default WarningBlock;
