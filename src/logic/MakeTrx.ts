import { message } from "antd";
import TonWeb from "tonweb";

export const MakeTrx = async (
  setIsload: any,
  hexString: any,
  cellIds: any,
  NFTcost: number
) => {
  const ton = (window as any).ton;
  
  if (ton) {
    console.log(cellIds.length * NFTcost);
    ton.send("ton_sendTransaction", [
      {
        to: process.env.REACT_APP_BACK_TON_WALLET,
        value: TonWeb.utils.toNano(cellIds.length * NFTcost),
        data: `${hexString}${cellIds.join(".")}`,
      },
    ]);
  } else {
    message.error("Install tonweb!", 10);
  }
};

export const listener = (hexString: any, setIsload: any, cellIds: any,onClose:any) => {
  message.success("Wait trx pending...", 2);
    setIsload(true)

    const fff = ()=> fetch(
      `https://toncenter.com/api/v2/getTransactions?address=${process.env.REACT_APP_BACK_TON_WALLET}&limit=40&to_lt=0&archival=false`
    )
      .then((e: any) => e.json())
      .then((e: any) => {
        console.log(e);
        console.log(`${hexString}${cellIds.join(".")}`);
        const data = e.result.filter(
          (e: any) => e.in_msg.message === `${hexString}${cellIds.join(".")}`
        );
        if (data[0]) {
          console.log(data[0]);
          console.log(data[0].transaction_id.hash);
          clearInterval(int);
          message.success("Done trx!", 10);
          setIsload(false);
          MintNFTs(cellIds,hexString, setIsload, data[0].in_msg.source,onClose)

        }
      })
      fff()
  const int = setInterval(() => {
    fff()
   
  }, 10000);
};

const MintNFTs = (cellIds:any,hexString:any, setIsload:any, wallet: string,onClose:any) => {
  setIsload(true)

  fetch(
    `https://app.toncells.org:9917/API/payedIds`
    , {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ids:cellIds, hash: hexString, wallet: wallet})
    }
  )
    .then((e: any) => e.json())
    .then((e: any) => {
      console.log(e);

      if (e.status === "ok") {
        message.success("Done paying!", 10);
        setIsload(false)
        localStorage.setItem(
          "invoiceData",
          JSON.stringify({})
        );
        onClose()

        // e.nfthashes.forEach((element: any) => {
        // // message.success(`NFT #${element.id} hash: ${element.hash}`, 10);
        // });
      }else{
        message.error(`Some error here :/`, 10);
      }
    });
};
