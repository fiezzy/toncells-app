import { VFC, useEffect } from "react";
// import Header from "./components/Header";
import Cells from "./components/Cells";
import Container from "./components/Container";
import GetStatus from "./logic/GetStatus";

const App: VFC = () => {
	useEffect(() => {
		GetStatus();
	}, []);

	return (
		<Container>
			<Cells />
		</Container>
	);
};

export default App;
