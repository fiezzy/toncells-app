import { VFC } from "react";
import Cell from "../Cell";
import { Wrapper } from "./style";

type cellLocation = {
  x: number;
  y: number;
  z: number;
};

type CellType = {
  id: number;
  location: cellLocation;
  nft: string;
};

const CellsArea: VFC = () => {
  const handleClick = (id: number) => console.log(`Cell id: ${id}`);

  const cellsCollection: CellType[] = [];

  // for (let i = 0; i < 16; i++) {
  //   cellsCollection.push({});
  // }

  return (
    <Wrapper>
      {cellsCollection.map(({ id }) => (
        <Cell key={id} handleClick={handleClick} id={id} />
      ))}
    </Wrapper>
  );
};

export default CellsArea;
