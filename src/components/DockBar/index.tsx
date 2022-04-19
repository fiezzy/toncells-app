import { VFC, useState, useCallback } from "react";
import { Wrapper, ConnectButton, SupportButton, Available } from "./style";
import { Modal } from "../Modal";
import NftViewer from "../NftViewer";

const SEPEZHO_LINK = "https://t.me/toncells_technical_support";

const DockBar = (props: any) => {
	const numberMinted = props.bigArr?.status.filter(
		(e: any) => e.Status !== "Free"
	).length;

	return (
		<Wrapper>
			<ConnectButton>
				Connect <span>Wallet</span>
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
