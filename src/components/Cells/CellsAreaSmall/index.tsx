import { VFC } from "react";
import { Wrapper } from "./style";

type Props = {
  areaId: number | null;
  isActive: boolean;
};

const CellsAreaSmall: VFC<Props> = (props) => {
  const { areaId, isActive } = props;

  return (
    <Wrapper isActive={isActive}>
      {areaId !== null && <span>#{areaId}</span>}
    </Wrapper>
  );
};

export default CellsAreaSmall;
