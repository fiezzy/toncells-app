import { VFC } from "react";
import { Wrapper, LogoWrapper, Logo, LogoLabel } from "./style";
import { LOGO } from "../../constants/images";
import ConnectButton from "../ConnectButton";

const Header: VFC = () => {
  return (
    <Wrapper>
      <LogoWrapper>
        <Logo src={LOGO} alt="TonCells logo" />
        <LogoLabel>TON Cells</LogoLabel>
      </LogoWrapper>
      <ConnectButton />
    </Wrapper>
  );
};

export default Header;
