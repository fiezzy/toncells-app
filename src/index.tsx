import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CellModalProvider } from "./context/CellModalContext";
import reportWebVitals from "./reportWebVitals";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: "Roboto", sans-serif !important;
    margin: 0;
    padding: 0;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <CellModalProvider>
      <GlobalStyle />
      <App />
    </CellModalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
