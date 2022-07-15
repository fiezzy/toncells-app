import { VFC, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";
import { Modal } from "../Modal";
import { App } from "../../typings";
import NftItem from "./components/NftItem";
import {
  Wrapper,
  ConnectWalletBlock,
  ConnectWalletBtn,
  Label,
  Title,
  WalletTitle,
  Line,
  CloseBtn,
  CopyBtn,
  WalletWrapper,
  ItemsWrapper,
} from "./style";
import { CloseOutlined, CopyOutlined } from "@ant-design/icons";

type Props = {
  cellsData: any;
  isVisible: boolean;
  onClose: () => void;
  toggleConnectWalletMode: () => void;
  cellsCollection: App.CellsAreaType[];
};

const UserModal: VFC<Props> = (props) => {
  const { isVisible, onClose, toggleConnectWalletMode, cellsData } = props;

  const { isSigned, tonWalletAddress } = useContext<any>(AuthContext);

  const copy = useCopyToClipboard();

  const navigate = useNavigate();

  const handleConnectWalletBtnClick = () => {
    onClose();
    toggleConnectWalletMode();
  };

  let ownerItems;

  if (isSigned) {
    ownerItems = cellsData?.status.filter(
      (cell: any) => cell.Wallet === tonWalletAddress
    );
  }

  console.log(ownerItems);

  const handleNftItemClick = (cellId: number) => {
    navigate(`/${cellId}`);
  };

  const handleCloseClick = () => {
    onClose();
    navigate("/");
  };

  return (
    <Modal isVisible={isVisible} onClose={handleCloseClick}>
      <Wrapper>
        <CloseBtn onClick={handleCloseClick}>
          <CloseOutlined />
        </CloseBtn>
        {!isSigned ? (
          <ConnectWalletBlock>
            <ConnectWalletBtn onClick={handleConnectWalletBtnClick}>
              Connect Wallet
            </ConnectWalletBtn>
          </ConnectWalletBlock>
        ) : (
          <div>
            <Title>PROFILE</Title>
            <Label>Your Wallet:</Label>
            <WalletWrapper>
              <WalletTitle>{tonWalletAddress}</WalletTitle>
              <CopyBtn onClick={() => copy(tonWalletAddress)}>
                <CopyOutlined />
              </CopyBtn>
            </WalletWrapper>
            <Line />
            <Label>Your items:</Label>
            <ItemsWrapper isEmpty={ownerItems.length < 1}>
              {ownerItems.length > 0 ? (
                ownerItems.map((item: any) => (
                  <NftItem
                    key={item.ID}
                    cellId={item.ID}
                    handleNftItemClick={() => handleNftItemClick(item.ID)}
                  />
                ))
              ) : (
                <div>No cells found..</div>
              )}
            </ItemsWrapper>
          </div>
        )}
      </Wrapper>
    </Modal>
  );
};

export default UserModal;
