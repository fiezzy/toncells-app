import { VFC } from "react";
import { InfoBlock, InfoLabel, InfoText } from "./style";

type Props = {
	locationX: number;
	locationY: number;
	locationZ: number;
	status: string;
	actualCellData: any;
};

const CellInfo: VFC<Props> = (props) => {
	const { locationX, locationY, locationZ, status, actualCellData } = props;

	console.log(actualCellData);

	return (
		<InfoBlock>
			{actualCellData && status && (
				<InfoLabel status={status}>
					TONCELL #{actualCellData.ID}
					<br />
					X: {locationY} | Y: {locationX} | Z: {locationZ}
					<br />
					Status:
					<span> {status.toUpperCase()}</span>
				</InfoLabel>
			)}

			{actualCellData && actualCellData.Status === "Minted" ? (
				<InfoText>
					<span>Owner: </span>
					<br />
					{actualCellData.Wallet}
					<br />
					<br />

					{actualCellData.Username !== "" && (
						<>
							<span>Telegram Name: </span>
							<br />
							<a
								href={`https://t.me/${actualCellData.Username}`}
								target="_blank"
								rel="noreferrer">
								@{actualCellData.Username}
							</a>
							<br />
							<br />
						</>
					)}

					{actualCellData.Link !== "" && (
						<>
							<span>Link: </span>
							<br />
							<a href={actualCellData.Link} target="_blank" rel="noreferrer">
								{actualCellData.Link}
							</a>
							<br />
							<br />
						</>
					)}

					{actualCellData.Text !== "" && (
						<>
							<span>Description: </span>
							<br />
							<pre>{actualCellData.Text}</pre>
						</>
					)}

					<span>Hash: </span>
					<br />
					{actualCellData.Hash}
					<br />
					<br />
				</InfoText>
			) : actualCellData.Status === "Payed" ? (
				<>
					<span>Paid: </span>
					<br />
					{actualCellData.Wallet}
					<br />
					<br />
				</>
			) : (
				<InfoText>
					<span>Description: </span>
					<br />
					This item gives you an access to edit cell #{actualCellData.ID} of
					TonCells Project.
					<br />
					<br />
					TonCells is a 100x100 celled field where each cell can be edited. Make
					your unique NFT even more unique by customizing it how you want.
					<br />
					<br />
					Draw, add pictures & videos, edit your own description and mainly do
					whatever you want! This item gives you x% discount for the next
					purchase. / This item doesn't give you any discount.
				</InfoText>
			)}
		</InfoBlock>
	);
};

export default CellInfo;
