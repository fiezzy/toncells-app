import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CellModalProvider } from "./context/CellModalContext";
import { AuthProvider } from "./context/AuthContext";
import reportWebVitals from "./reportWebVitals";
import { createGlobalStyle } from "styled-components";
import "antd/dist/antd.css";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: "Roboto", sans-serif !important;
    margin: 0;
    padding: 0;
  }

	.ant-message{
		z-index: 9999999;
	}
`;

ReactDOM.render(
  <React.StrictMode>
    <CellModalProvider>
      <AuthProvider>
        <GlobalStyle />
        <App />
      </AuthProvider>
    </CellModalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
