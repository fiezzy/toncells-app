import { VFC, memo } from "react";
import { Modal } from "../Modal";
import { CLOSE_ICON } from "../../constants/images";
import {
	Wrapper,
	LabelId,
	CloseBtn,
	FlexWrapper,
	InfoBlock,
	InfoText,
	Cell,
	InfoLabel,
	BuyButton,
} from "./style";
// import {} "../../../public/images/nftitems/"

type Props = {
	isVisible: boolean;
	onClose: () => void;
	id: number;
	locationX: number;
	locationY: number;
	locationZ: number;
	toggleBuyMode: () => void;
	activeCellId: number;
	cellIds: number[];
	setnftIdfun: any;
};

const CellModalBuy: VFC<Props> = memo((props) => {
	const {
		isVisible,
		onClose,
		locationX,
		locationY,
		locationZ,
		toggleBuyMode,
		activeCellId,
		cellIds,
		setnftIdfun,
	} = props;

	return (
		<Modal isVisible={isVisible} onClose={onClose}>
			<Wrapper>
				<CloseBtn onClick={toggleBuyMode}>
					<img src={CLOSE_ICON} alt="Close" />
				</CloseBtn>
				<LabelId>#{activeCellId}</LabelId>
				<FlexWrapper>
					<Cell />
					<InfoBlock>
						<InfoLabel>
							TONCELL #{activeCellId}
							<br />
							X: {locationX} | Y: {locationY} | Z: {locationZ}
						</InfoLabel>
						<InfoText>
							<span>Description: </span>
							This item gives you an access to edit cell #{activeCellId} of
							TonCells Project.
							<br />
							<br />
							TonCells is a 100x100 celled field where each cell can be edited.
							Make your unique NFT even more unique by customizing it how you
							want.
							<br />
							<br />
							Draw, add pictures & videos, edit your own description and mainly
							do whatever you want! This item gives you x% discount for the next
							purchase. / This item doesn't give you any discount.
						</InfoText>
						<BuyButton onClick={() => alert(`Buy Cell # ${activeCellId}`)}>
							BUY
						</BuyButton>
					</InfoBlock>
				</FlexWrapper>
			</Wrapper>
		</Modal>
	);
});

export default CellModalBuy;
