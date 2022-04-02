import { VFC, memo } from "react";
import { Wrapper, StyledCell } from "./style";

const cellsCollection: any[] = [];

for (let i = 0; i < 16; i++) {
  cellsCollection.push({
    id: i + 1,
  });
}

type Props = {
  toggleBuyMode: () => void;
  handleCellClick: (id: number) => void;
};

const CellsArea: VFC<Props> = memo((props) => {
  const { toggleBuyMode, handleCellClick } = props;

  const handleClick = (id: number) => {
    toggleBuyMode();
    handleCellClick(id);
  };

  return (
    <Wrapper>
      {cellsCollection.map(({ id }) => (
        <StyledCell key={id} handleClick={() => handleClick(id)} id={id} />
      ))}
    </Wrapper>
  );
});

export default CellsArea;
