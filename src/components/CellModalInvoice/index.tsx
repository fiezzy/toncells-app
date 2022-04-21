import { VFC, useState, useEffect, memo } from "react";
import { Modal } from "../Modal";
import { CLOSE_ICON } from "../../constants/images";
import CellModalEdit from "../CellModalEdit";
import QRCode from "react-qr-code";
import { CloseOutlined } from "@ant-design/icons";
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
		const [hex, setHex] = useState<string>("");
		console.log(cellIds);
		const NFTcost = 0.1;

		const setIsload = (a: any) => {};
		const link = `ton://transfer/${
			process.env.REACT_APP_BACK_TON_WALLET
		}?amount=${TonWeb.utils.toNano(
			(cellIds.length * NFTcost).toFixed(3)
		)}&text=${hex}${cellIds.join(".")}`;

		useEffect(() => {
			message.success("Reserving NFTs...", 10);
			fetch(`https://app.toncells.org:9966/API/reserveIds`, {
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
						setHex(
							Array(16)
								.fill("")
								.map(() => Math.round(Math.random() * 0xf).toString(16))
								.join("")
						);

						// listener(hexString, setIsload, cellIds);
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
						<CloseOutlined />
					</CloseBtn>
					<LabelId>Invoice #{hex}</LabelId>
					{reserved ? null : <LabelId>NFTs already reserved</LabelId>}

					<FlexWrapper>
						{reserved ? (
							<QRCode value={reserved ? link : "NFTS ALREADY RESERVED"} />
						) : null}
						<InfoBlock>
							{reserved ? (
								<InfoText>
									<span>Description: </span>
									Buy IDs {cellIds.map((e) => e + "; ")}
								</InfoText>
							) : null}

							{reserved ? (
								<BuyButton
									onClick={() =>
										reserved ? MakeTrx(setIsload, hex, cellIds, NFTcost) : null
									}>
									TONWEB
								</BuyButton>
							) : null}

							{reserved ? (
								<a href={link}>
									<BuyButton onClick={() => {}}>LINK</BuyButton>
								</a>
							) : null}

							{reserved ? (
								<BuyButton onClick={() => listener(hex, setIsload, cellIds)}>
									Im payed
								</BuyButton>
							) : null}
						</InfoBlock>
					</FlexWrapper>
				</Wrapper>
			</Modal>
		);
	}
);

export default CellModalBuy;
