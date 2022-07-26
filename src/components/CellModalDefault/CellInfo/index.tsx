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
      <InfoLabel status={status}>
        TONCELL #{actualCellData.ID}
        <br />
        X: {locationY} | Y: {locationX} | Z: {locationZ}
        <br />
        Status:
        <span> {status.toUpperCase()}</span>
      </InfoLabel>

      <InfoText>
        <span>Owner: </span>
        <br />
        {actualCellData.Wallet}
        <br />
        <br />
        <span>Hash: </span>
        <br />
        {actualCellData.Hash}
        <br />
        <br />

        {actualCellData.Username !== "" && (
          <>
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
      </InfoText>
    </InfoBlock>
  );
};

export default CellInfo;
