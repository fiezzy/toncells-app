import { VFC } from "react";
import { InfoBlock, InfoLabel, InfoText } from "./style";

type Props = {
  locationX: number;
  locationY: number;
  locationZ: number;
  ownerData:
    | {
        wallet: string;
        hash: string;
      }
    | null
    | undefined;
  status: string;
  actualCellData: any;
};

const CellInfo: VFC<Props> = (props) => {
  const { locationX, locationY, locationZ, ownerData, status, actualCellData } =
    props;

  console.log(actualCellData);

  return (
    <InfoBlock>
      <InfoLabel status={status}>
        TONCELL #{actualCellData.ID}
        <br />
        X: {locationY} | Y: {locationX} | Z: {locationZ}
        <br />
        Status:
        <span> {status.toUpperCase()}</span>
      </InfoLabel>
      <InfoText>
        {ownerData !== null && (
          <>
            <span>Owner: </span>
            <br />
            {ownerData!.wallet}
            <br />
            <br />
            <span>Hash: </span>
            <br />
            {ownerData!.hash}
            <br />
            <br />
          </>
        )}
        <span>Telegram Name: </span>
        <br />
        <a
          href={`https://t.me/${actualCellData.Username}`}
          target="_blank"
          rel="noreferrer"
        >
          @{actualCellData.Username}
        </a>
        <br />
        <br />
        <span>Link: </span>
        <br />
        <a href={actualCellData.Link} target="_blank" rel="noreferrer">
          {actualCellData.Link}
        </a>
        <br />
        <br />
        <span>Description: </span>
        <br />
        {actualCellData.Text}
      </InfoText>
      {/* <BuyButton onClick={() => alert(`Buy Cell # ${activeCellId}`)}>
        BUY
      </BuyButton> */}
    </InfoBlock>
  );
};

export default CellInfo;
