import { VFC, useContext } from "react";
import { Modal } from "../Modal";
import { useAuth } from "../../hooks/useAuth";
import { AuthContext } from "../../context/AuthContext";
import {
  TONWALLET_ICON,
  TONKEEPER_ICON,
  TONHUB_ICON,
  CLOSE_ICON,
} from "../../constants/images";
import {
  Wrapper,
  HeaderWrapper,
  WalletsWrapper,
  Title,
  Wallet,
  CloseBtn,
  YourWalletTitle,
  YourWalletLabel,
  Button,
  ConnectedWrapper,
  CloseBtnWrapper,
  LogOutBtn,
  WalletWrapper,
} from "./style";

import { LogoutOutlined } from "@ant-design/icons";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  toggleUserModalMode: () => void;
};

const wallets = [
  {
    id: 1,
    label: "TON Wallet",
    img: TONWALLET_ICON,
    isAvailable: true,
  },
  {
    id: 2,
    label: "Tonkeeper",
    img: TONKEEPER_ICON,
    isAvailable: false,
  },
  {
    id: 3,
    label: "Tonhub",
    img: TONHUB_ICON,
    isAvailable: false,
  },
];

const ConnectWalletModal: VFC<Props> = (props) => {
  const { isVisible, onClose, toggleUserModalMode } = props;

  const { logIn, logOut } = useAuth();

  const { isSigned, tonWalletAddress } = useContext<any>(AuthContext);

  // console.log(tonWalletAddress);

  const handleOpenProfileBtn = () => {
    onClose();
    toggleUserModalMode();
  };

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <Wrapper isSigned={isSigned}>
        {!isSigned ? (
          <>
            <HeaderWrapper>
              <Title>Connect To A Wallet</Title>
              <CloseBtn src={CLOSE_ICON} alt="Close Button" onClick={onClose} />
            </HeaderWrapper>
            <WalletsWrapper>
              {wallets.map(({ id, label, img, isAvailable }) => (
                <Wallet key={id} isAvailable={isAvailable} onClick={logIn}>
                  <img src={img} alt="Wallet icon" />
                  <span>{isAvailable ? label : `${label} | soon..`}</span>
                </Wallet>
              ))}
            </WalletsWrapper>
          </>
        ) : (
          <ConnectedWrapper>
            <YourWalletTitle>CONNECTED WALLET: </YourWalletTitle>
            <CloseBtnWrapper>
              <CloseBtn src={CLOSE_ICON} alt="Close Button" onClick={onClose} />
            </CloseBtnWrapper>
            <WalletWrapper>
              <YourWalletLabel>{tonWalletAddress}</YourWalletLabel>
              <LogOutBtn onClick={logOut}>
                LOGOUT <LogoutOutlined />
              </LogOutBtn>
            </WalletWrapper>
            <Button onClick={handleOpenProfileBtn}>Open Profile</Button>
          </ConnectedWrapper>
        )}
      </Wrapper>
    </Modal>
  );
};

export default ConnectWalletModal;
