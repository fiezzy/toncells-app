import { VFC, useState, useCallback } from "react";
import {
	Wrapper,
	ConnectButton,
	SupportButton,
	Available,
	Search,
} from "./style";
import { Modal } from "../Modal";
import NftViewer from "../NftViewer";
import { message } from "antd";
import {
	WalletTwoTone,
	TeamOutlined,
	SearchOutlined,
	FullscreenOutlined,
	FullscreenExitOutlined,
	MenuOutlined,
} from "@ant-design/icons";

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
		<Wrapper
			onMouseEnter={() => props.setonSideBar(true)}
			onMouseLeave={() => props.setonSideBar(false)}>
			<ConnectButton onClick={() => connectWalletTON(setTONwalletKey)}>
				{!key ? (
					<WalletTwoTone />
				) : (
					<span>{`${key.slice(0, 3)}...${key.slice(-2)}`}</span>
				)}
			</ConnectButton>
			<Search onClick={props.toggleBuyMode}>
				<SearchOutlined />
			</Search>

			<Search onClick={props.toggleMap}>
				<MenuOutlined />
			</Search>

			<a href={SEPEZHO_LINK} target="_blank" rel="noreferrer">
				<SupportButton>
					<TeamOutlined />
				</SupportButton>
			</a>

			<Search onClick={() => props.togglezoom(!props.zoom)}>
				{props.zoom ? <FullscreenOutlined /> : <FullscreenExitOutlined />}
			</Search>

			<Available>
				Free cells: <br />
				{((2944 - numberMinted) / 1000).toFixed(2)}k/10k
			</Available>

			<Available>
				Version: <br />
				0.0.1 (alfa)
			</Available>
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
