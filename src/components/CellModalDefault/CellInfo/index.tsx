import { VFC } from "react";
import { InfoBlock, InfoLabel, InfoText, BuyButton } from "./style";

type Props = {
  activeCellId: number;
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
};

const CellInfo: VFC<Props> = (props) => {
  const { activeCellId, locationX, locationY, locationZ, ownerData, status } =
    props;

  console.log(status);

  return (
    <InfoBlock>
      <InfoLabel status={status}>
        TONCELL #{activeCellId}
        <br />
        X: {locationX} | Y: {locationY} | Z: {locationZ}
        <br />
        Status:
        <span> {status.toUpperCase()}</span>
      </InfoLabel>
      <InfoText>
        {ownerData !== null && (
          <>
            <span>Owner: </span>
            {ownerData!.wallet}
            <br />
            <br />
            <span>Hash: </span>
            {ownerData!.hash}
            <br />
            <br />
          </>
        )}
        <span>Description: </span>
        This item gives you an access to edit cell #{activeCellId} of TonCells
        Project.
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
      {/* <BuyButton onClick={() => alert(`Buy Cell # ${activeCellId}`)}>
        BUY
      </BuyButton> */}
    </InfoBlock>
  );
};

export default CellInfo;
