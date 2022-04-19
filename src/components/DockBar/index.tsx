import { VFC, useState, useCallback } from "react";
import { Wrapper, ConnectButton, SupportButton, Available } from "./style";
import { Modal } from "../Modal";
import NftViewer from "../NftViewer";
import { message, Table } from "antd";

const SEPEZHO_LINK = "https://t.me/toncells_technical_support";

const DockBar = (props: any) => {
	const numberMinted = props.bigArr?.status.filter(
		(e: any) => e.Status !== "Free"
	).length;

	// const conWal = () => {
	// 	//@ts-ignore
	// 	if (!window.ton) {
	// 		message.error("Install TonWeb", 10);
	// 	} else {
	// 	}
	// };

	const [key, setTONwalletKey] = useState("");

	return (
		<Wrapper>
			<ConnectButton onClick={() => connectWalletTON(setTONwalletKey)}>
				{!key ? (
					<>
						Connect <span>Wallet</span>
					</>
				) : (
					<>
						Connected!
						<br />
						<span>{`${key.slice(0, 3)}...${key.slice(-2)}`}</span>
					</>
				)}
			</ConnectButton>
			<a href={SEPEZHO_LINK} target="_blank" rel="noreferrer">
				<SupportButton>Technical Support</SupportButton>
			</a>
			<Available>
				Available <br /> <span>{2944 - numberMinted} of 2944</span>
			</Available>
			<Available onClick={props.toggleBuyMode}>NftViewer</Available>
		</Wrapper>
	);
};

export default DockBar;

const connectWalletTON = async (setTONwalletKey: any) => {
	try {
		//@ts-ignore
		const ton = window.ton;
		if (ton) {
			const accounts = await ton.send("ton_requestWallets");
			setTONwalletKey(accounts[0].address);
		}
	} catch (err) {
		message.error(
			"Install TonWallet. Close all TonWallet windows and try again pls",
			5
		);
	}
};
