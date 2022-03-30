import { FC, useState, useCallback, createContext } from "react";
import { App } from "../../typings";

const CellModalContext = createContext({} as App.CellModalContext);

const CellModalProvider: FC = (props) => {
  const { children } = props;

  const [isCellModalActive, setIsCellModalActive] = useState<boolean>(false);

  const toggleCellModal = useCallback(() => {
    setIsCellModalActive((prev) => !prev);
  }, []);

  console.log(isCellModalActive);

  return (
    <CellModalContext.Provider value={{ isCellModalActive, toggleCellModal }}>
      {children}
    </CellModalContext.Provider>
  );
};

export { CellModalContext, CellModalProvider };
