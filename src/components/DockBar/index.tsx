import { VFC, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  Wrapper,
  ConnectButton,
  SupportButton,
  Available,
  Search,
} from "./style";
import {
  WalletTwoTone,
  SearchOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  MenuOutlined,
  QuestionCircleOutlined,
  InfoOutlined,
  TransactionOutlined,
  AppstoreAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

const SEPEZHO_LINK = "https://t.me/toncells_technical_support";

type Props = {
  bigArr: any;
  setonSideBar: (isSideBarActive: boolean) => void;
  toggleBuyMode: () => void;
  toggleZoomMode: (isZoom: boolean) => void;
  isZoomMode: boolean;
  toggleMap: () => void;
  toggleDescMode: () => void;
  toggleInvoiceMode: () => void;
  hex: string;
  isBuyALotMode: boolean;
  buyAreas: () => void;
  toggleBuyALotMode: () => void;
  toggleConnectWalletMode: () => void;
  toggleUserModalMode: () => void;
};

const DockBar: VFC<Props> = (props) => {
  const {
    bigArr,
    setonSideBar,
    toggleBuyMode,
    toggleZoomMode,
    isZoomMode,
    toggleMap,
    isBuyALotMode,
    buyAreas,
    toggleConnectWalletMode,
    toggleInvoiceMode,
    toggleBuyALotMode,
    toggleUserModalMode,
  } = props;

  const numberMinted = bigArr?.status.filter(
    (e: any) => e.Status !== "Free"
  ).length;

  return (
    <Wrapper
      onMouseEnter={() => setonSideBar(true)}
      onMouseLeave={() => setonSideBar(false)}
    >
      {props.hex && (
        <ConnectButton onClick={toggleInvoiceMode}>
          <TransactionOutlined />
        </ConnectButton>
      )}

      <Search onClick={() => toggleZoomMode(!isZoomMode)}>
        {isZoomMode ? <FullscreenOutlined /> : <FullscreenExitOutlined />}
      </Search>

      <Search onClick={toggleConnectWalletMode}>
        <WalletTwoTone />
      </Search>

      <Search onClick={toggleUserModalMode}>
        <UserOutlined />
      </Search>

      <Search
        onClick={() => (isBuyALotMode ? buyAreas() : toggleBuyALotMode())}
      >
        {/* <LinkOutlined /> */}
        {isBuyALotMode ? "Mint IDs!" : <AppstoreAddOutlined />}
      </Search>

      {isBuyALotMode ? (
        <Search onClick={toggleBuyALotMode}>
          {/* <LinkOutlined /> */}
          Cancel!
        </Search>
      ) : null}

      <Search onClick={toggleBuyMode}>
        <SearchOutlined />
      </Search>

      <Search onClick={toggleMap}>
        <MenuOutlined />
      </Search>

      <Search onClick={props.toggleDescMode}>
        {/* <LinkOutlined /> */}
        <InfoOutlined />
      </Search>

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
        0.8.9 beta
      </Available>
    </Wrapper>
  );
};

export default DockBar;
