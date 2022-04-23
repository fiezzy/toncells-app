import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CellModalProvider } from "./context/CellModalContext";
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
			<GlobalStyle />
			<App />
		</CellModalProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
