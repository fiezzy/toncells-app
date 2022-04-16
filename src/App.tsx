import { VFC, useEffect } from "react";
import Cells from "./components/Cells";
import Container from "./components/Container";
import DockBar from "./components/DockBar";
import OpenOnDesktop from "./components/OpenOnDesktop";
import { useWindowDimensions } from "./hooks/useWindowDimensions";
import { NFT_ICONS } from "./constants/images";
import { NftIcon, CellsWrapperX, IconsX, CellsWrapperY, IconsY } from "./style";
import GetStatus from "./logic/GetStatus";

type NftIconsType = {
	id: number;
	src: string;
};

export const nftIcons: NftIconsType[] = [];

for (let i = 1; i < 26; i++) {
	nftIcons.push({
		id: i + 1,
		src: `${NFT_ICONS + i}.png`,
	});
}

const App: VFC = () => {
	useEffect(() => {
		GetStatus();
	}, []);
	const { width } = useWindowDimensions();

	const nftItems = nftIcons.map(({ id, src }) => (
		<NftIcon key={id} src={src} alt="#" />
	));

	if (width < 768) {
		return <OpenOnDesktop />;
	}

	return (
		<>
			<Container>
				<CellsWrapperX>
					<IconsX>{nftItems}</IconsX>
					<CellsWrapperY>
						<IconsY>{nftItems}</IconsY>
						<Cells />
					</CellsWrapperY>
				</CellsWrapperX>
				<DockBar />
			</Container>
		</>
	);
};

export default App;
