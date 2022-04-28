import { VFC, useState } from "react";
import {
	Wrapper,
	ConnectButton,
	SupportButton,
	Available,
	Search,
} from "./style";
import { message } from "antd";
import {
	WalletTwoTone,
	TeamOutlined,
	SearchOutlined,
	FullscreenOutlined,
	FullscreenExitOutlined,
	MenuOutlined,
	MessageOutlined,
	QuestionCircleOutlined,
	LoadingOutlined,
	InfoOutlined,
	TransactionOutlined,
	AppstoreAddOutlined,
} from "@ant-design/icons";

const SEPEZHO_LINK = "https://t.me/toncells_technical_support";

type Props = {
	bigArr: any;
	setonSideBar: (isSideBarActive: boolean) => void;
	isBuyMode: boolean;
	toggleBuyMode: () => void;
	toggleZoomMode: (isZoom: boolean) => void;
	isZoomMode: boolean;
	toggleMap: () => void;
	toggleDescMode: () => void;
};

const DockBar: VFC<any> = (props) => {
	const {
		bigArr,
		setonSideBar,
		toggleBuyMode,
		toggleZoomMode,
		isZoomMode,
		toggleMap,
		toggleInvoiceMode,
		hex,
		buyAlotStatus,
		buyAreas,
	} = props;

	const numberMinted = bigArr?.status.filter(
		(e: any) => e.Status !== "Free"
	).length;

	const [key, setTONwalletKey] = useState("");

	return (
		<Wrapper
			onMouseEnter={() => setonSideBar(true)}
			onMouseLeave={() => setonSideBar(false)}>
			{/* <ConnectButton onClick={() => connectWalletTON(setTONwalletKey)}>
				{!key ? (
					<WalletTwoTone />
				) : (
					<span>{`${key.slice(0, 3)}...${key.slice(-2)}`}</span>
				)}
			</ConnectButton> */}

			{props.hex && (
				<ConnectButton onClick={props.toggleInvoiceMode}>
					<TransactionOutlined />
				</ConnectButton>
			)}

			<Search onClick={() => toggleZoomMode(!isZoomMode)}>
				{isZoomMode ? <FullscreenOutlined /> : <FullscreenExitOutlined />}
			</Search>

			<Search onClick={toggleMap}>
				<MenuOutlined />
			</Search>

			<Search onClick={toggleBuyMode}>
				<SearchOutlined />
			</Search>

			<Search onClick={props.toggleDescMode}>
				{/* <LinkOutlined /> */}
				<InfoOutlined />
			</Search>

			<Search onClick={() => (buyAlotStatus ? buyAreas() : props.buyAlot())}>
				{/* <LinkOutlined /> */}
				{buyAlotStatus ? "Mint IDs!" : <AppstoreAddOutlined />}
			</Search>

			{buyAlotStatus ? (
				<Search onClick={props.buyAlot}>
					{/* <LinkOutlined /> */}
					Cancel!
				</Search>
			) : null}

			<a href={SEPEZHO_LINK} target="_blank" rel="noreferrer">
				<SupportButton>
					<QuestionCircleOutlined />
				</SupportButton>
			</a>

			<Available>
				Free cells: <br />
				{((2944 - numberMinted) / 1000).toFixed(2)}k/10k
			</Available>

			<Available>
				Version: <br />
				0.1.1 beta
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
