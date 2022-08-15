import { VFC, useState, useEffect, memo } from "react";
import { Modal } from "../Modal";
import { CLOSE_ICON } from "../../constants/images";
import CellModalEdit from "../CellModalEdit";
import QRCode from "react-qr-code";
import { CloseOutlined } from "@ant-design/icons";
import { MakeTrx, listener } from "../../logic/MakeTrx";
import TonWeb from "tonweb";
import { message } from "antd";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
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
  BtnsWrapper,
} from "./style";

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
  setSelectedCells: any;
};

enum Location {
  X = 1,
  Y = 1,
  Z = 4,
}

const CellModalBuy: VFC<any> = memo((props) => {
  const { isVisible, onClose, cellIds, setHex, hex, setSelectedCells } = props;

  const [reserved, setReserved] = useState<boolean>(false);
  const [isLoad, setIsload] = useState<boolean>(false);

  //console.log(cellIds);
  const NFTcost = 5;
  const link = `ton://transfer/${
    process.env.REACT_APP_BACK_TON_WALLET
  }?amount=${TonWeb.utils.toNano(
    (cellIds.length * NFTcost).toFixed(3)
  )}&text=${hex}${cellIds.join(".")}`;

  useEffect(() => {
    const saved = localStorage.getItem("invoiceData");

    if (!!!JSON.parse(saved ? saved : "{}").hex) {
      if (cellIds[0]) {
        message.success("Reserving NFTs...", 10);
        setIsload(true);

        try {
          fetch(`https://app.toncells.org:9917/API/reserveIds`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ids: cellIds }),
          })
            .then((e: any) => e.json())
            .then((e: any) => {
              setIsload(false);
              //console.log(e);

              if (e.status === "ok") {
                message.success("Reserved!", 10);
                setReserved(e.status === "ok");

                const afdasfdfas = Array(16)
                  .fill("")
                  .map(() => Math.round(Math.random() * 0xf).toString(16))
                  .join("");

                setHex(afdasfdfas);

                localStorage.setItem(
                  "invoiceData",
                  JSON.stringify({ hex: afdasfdfas, ids: cellIds })
                );
              } else {
                message.error("Already reserved!", 10);
                setReserved(e.status === "ok");
              }
            });
        } catch (error) {
          message.error("Something went wrong", 10);
          //console.log(error);
        }
      }
    } else {
      setReserved(true);
    }
  }, [cellIds]); // TODO add ids

  const [texttitle, stexttitle] = useState("Creating invoice");

  const cancel = () => {
    if (cellIds[0]) {
      stexttitle("Canceling invoice");
      message.success("Unreserving NFTs...", 10);
      setIsload(true);

      fetch(`https://app.toncells.org:9917/API/unreserveIds`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: cellIds }),
      })
        .then((e: any) => e.json())
        .then((e: any) => {
          localStorage.setItem("invoiceData", JSON.stringify({}));
          message.success("Canceled!", 10);
          setIsload(false);
          onClose();
          setHex("");
          stexttitle("Creating invoice");
          setSelectedCells([]);
        });
    }
  };

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <Wrapper>
        <CloseBtn onClick={onClose}>
          <CloseOutlined />
        </CloseBtn>
        {cellIds[0] ? (
          <>
            <LabelId>{isLoad ? texttitle : <>Invoice #{hex}</>}</LabelId>
            {isLoad ? (
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 56 }} spin />}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#000",
                }}
              />
            ) : (
              <>
                {reserved ? null : <LabelId>NFTs already reserved</LabelId>}

                {reserved ? (
                  <FlexWrapper>
                    <QRCode value={reserved ? link : "NFTS ALREADY RESERVED"} />
                    <InfoBlock>
                      <InfoText>
                        <span>Description: </span>
                        Total: {cellIds.length * NFTcost}TON; <br />
                        <br />
                        Buy IDs: {cellIds.map((e: any) => e + "; ")}
                      </InfoText>
                      #1 PAY VIA:
                      <br />
                      <BtnsWrapper>
                        <BuyButton
                          onClick={() =>
                            reserved
                              ? MakeTrx(setIsload, hex, cellIds, NFTcost)
                              : null
                          }
                        >
                          TONWEB
                        </BuyButton>

                        <a href={link}>
                          <BuyButton onClick={() => {}}>LINK</BuyButton>
                        </a>
                      </BtnsWrapper>
                      <br />
                      #2 WHEN U PAY CLICK ON "I paid":
                      <br />
                      <BtnsWrapper>
                        <BuyButton
                          onClick={() =>
                            listener(hex, setIsload, cellIds, onClose)
                          }
                        >
                          I paid
                        </BuyButton>

                        <BuyButton onClick={() => cancel()}>Cancel</BuyButton>
                      </BtnsWrapper>
                    </InfoBlock>
                  </FlexWrapper>
                ) : null}
              </>
            )}
          </>
        ) : (
          <LabelId>Select some cells</LabelId>
        )}
      </Wrapper>
    </Modal>
  );
});

export default CellModalBuy;
