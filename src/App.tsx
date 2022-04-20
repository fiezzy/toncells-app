import { VFC, useEffect, useState, useCallback } from "react";
import Cells from "./components/Cells";
import Container from "./components/Container";
import DockBar from "./components/DockBar";
import OpenOnDesktop from "./components/OpenOnDesktop";
import { useWindowDimensions } from "./hooks/useWindowDimensions";
import { NFT_ICONS } from "./constants/images";
import { NftIcon, CellsWrapperX, IconsX, CellsWrapperY, IconsY } from "./style";
import GetStatus from "./logic/GetStatus";
import { Modal } from "./components/Modal";
import NftViewer from "./components/NftViewer";

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
	const [bigArr, setBigArr] = useState();
	const [isBuyMode, setIsBuyMode] = useState<boolean>(false);

	const toggleBuyMode = useCallback(() => {
		setIsBuyMode((prev) => !prev);
	}, []);

	useEffect(() => {
		(async () => {
			setBigArr(await GetStatus());
		})();
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
				<DockBar
					bigArr={bigArr}
					isBuyMode={isBuyMode}
					toggleBuyMode={toggleBuyMode}
				/>
				{isBuyMode && (
					<NftViewer
						isBuyMode={isBuyMode}
						bigArr={bigArr}
						toggleBuyMode={toggleBuyMode}
					/>
				)}
				<CellsWrapperX>
					<IconsX>{nftItems}</IconsX>
					<CellsWrapperY>
						<IconsY>{nftItems}</IconsY>
						<Cells />
					</CellsWrapperY>
				</CellsWrapperX>
			</Container>
		</>
	);
};

export default App;
