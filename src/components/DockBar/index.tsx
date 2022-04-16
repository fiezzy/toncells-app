import { VFC } from "react";
import { Wrapper, ConnectButton, SupportButton, Available } from "./style";

const SEPEZHO_LINK = "https://t.me/sepezho";

const DockBar: VFC = () => {
  return (
    <Wrapper>
      <ConnectButton>
        Connect <span>Wallet</span>
      </ConnectButton>
      <a href={SEPEZHO_LINK} target="_blank" rel="noreferrer">
        <SupportButton>Technical Support</SupportButton>
      </a>
      <Available>
        Available <br /> <span>5 of 500</span>
      </Available>
    </Wrapper>
  );
};

export default DockBar;
