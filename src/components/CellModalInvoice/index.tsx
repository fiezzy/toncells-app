import { VFC, useState, useEffect, memo } from "react";
import { Modal } from "../Modal";
import { CLOSE_ICON } from "../../constants/images";
import CellModalEdit from "../CellModalEdit";
import QRCode from "react-qr-code";
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
import { MakeTrx, listener } from "../../logic/MakeTrx";
import TonWeb from "tonweb";
import { message } from "antd";

const CELL_ID = "0000";
const EDITABLE_CELL_ID = 6;

type Props = {
	isVisible: boolean;
	onClose: () => void;
	id: number;
	locationX: number;
	locationY: number;
	toggleInvoiceMode: () => void;
	activeCellId: number;
	cellIds: number[];
};

enum Location {
	X = 1,
	Y = 1,
	Z = 4,
}

const hexString = Array(16)
	.fill("")
	.map(() => Math.round(Math.random() * 0xf).toString(16))
	.join("");

const CellModalBuy: VFC<Props> = memo(
	({
		isVisible,
		onClose,
		locationX,
		locationY,
		toggleInvoiceMode,
		activeCellId,
		cellIds,
	}) => {
		const [reserved, setReserved] = useState<boolean>(false);
		console.log(cellIds);
		const NFTcost = 0.1;

		const setIsload = (a: any) => {};
		const link = `ton://transfer/${
			process.env.REACT_APP_BACK_TON_WALLET
		}?amount=${TonWeb.utils.toNano(
			(cellIds.length * NFTcost).toFixed(3)
		)}&text=${hexString}${cellIds.join(".")}`;

		useEffect(() => {
			message.success("Reserving NFTs...", 10);
			fetch(`https://localhost:9966/API/reserveIds`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ids: cellIds }),
			})
				.then((e: any) => e.json())
				.then((e: any) => {
					console.log(e);
					if (e.status === "ok") {
						message.success("Reserved!", 10);
						setReserved(e.status === "ok");
						listener(hexString, setIsload, cellIds);
					} else {
						message.error("Already reserved!", 10);
						setReserved(e.status === "ok");
					}
				});
		}, [cellIds]); // TODO add ids

		return (
			<Modal isVisible={isVisible} onClose={onClose}>
				<Wrapper>
					<CloseBtn onClick={toggleInvoiceMode}>
						<img src={CLOSE_ICON} alt="Close" />
					</CloseBtn>
					<LabelId>#{CELL_ID}</LabelId>
					<FlexWrapper>
						{reserved ? (
							<QRCode value={reserved ? link : "NFTS ALREADY RESERVED"} />
						) : null}

						<InfoBlock>
							<InfoLabel>
								TONCELL #{CELL_ID}
								<br />
								X: {locationX} | Y: {locationY} | Z: {activeCellId}
							</InfoLabel>
							<InfoText>
								<span>Description: </span>
								Do u really wanna buy cells?
							</InfoText>
							{reserved ? (
								<BuyButton
									onClick={() =>
										reserved
											? MakeTrx(setIsload, hexString, cellIds, NFTcost)
											: null
									}>
									BUY WITH TONWEB
								</BuyButton>
							) : null}

							{reserved ? (
								<a href={link}>
									<BuyButton onClick={() => alert(`Buy Cell # ${CELL_ID}`)}>
										BUY WITH LINK
									</BuyButton>
								</a>
							) : null}
						</InfoBlock>
					</FlexWrapper>
				</Wrapper>
			</Modal>
		);
	}
);

export default CellModalBuy;
