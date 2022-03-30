import { VFC, useContext } from "react";
// import Header from "./components/Header";
import Cells from "./components/Cells";
import CellModal from "./components/CellModal";
import Container from "./components/Container";
import { CellModalContext } from "./context";

const App: VFC = () => {
  return (
    <>
      <Container>
        <Cells />
      </Container>
    </>
  );
};

export default App;
