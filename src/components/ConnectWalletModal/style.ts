import styled from "styled-components";

export const Wrapper = styled.div<{ isSigned: boolean }>`
  padding: ${({ isSigned }) => (isSigned ? "22px 55px" : "20px 25px")};
  border-radius: 15px;
  background-color: #fff;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.span`
  font-size: 14px;
  font-weight: 900;
  color: #000;
  text-transform: uppercase;
  opacity: 0.5;
`;

export const WalletsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
  margin-top: 15px;
`;

export const Wallet = styled.div<{ isAvailable: boolean }>`
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: 0.3s;
  cursor: ${({ isAvailable }) => (isAvailable ? "pointer" : "not-allowed")};
  padding: 10px;
  width: 260px;
  border: 1px solid rgb(230, 235, 240);
  opacity: ${({ isAvailable }) => (!isAvailable ? "0.5" : "1")};

  &:hover {
    background-color: ${({ isAvailable }) =>
      isAvailable ? "#d9d9d9" : "#fff"};
  }

  img {
    width: 30px;
  }
`;

export const CloseBtn = styled.img`
  width: 12px;
  height: 25px;
  cursor: pointer;
  opacity: 0.8;
`;

export const ConnectedWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  position: relative;
`;

export const YourWalletTitle = styled.h4`
  font-weight: 900;
  font-size: 18px;
  text-align: center;
  padding: 0;
`;

export const YourWalletLabel = styled.p`
  font-weight: 500;
  font-size: 14px;
  color: #000;
  opacity: 0.6;
  margin: 0;
`;

export const Button = styled.button`
  border: none;
  outline: none;
  padding: 10px 65px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  color: #fff;
  transition: 0.3s;
  background-color: #000;

  &:hover {
    transform: scale(0.95);
    opacity: 0.6;
  }
`;

export const CloseBtnWrapper = styled.div`
  position: absolute;
  top: 2px;
  right: 0;
`;

export const LogOutBtn = styled.button`
  border: none;
  padding: 10px 15px;
  outline: none;
  cursor: pointer;
  background-color: #000;
  border-radius: 10px;
  font-weight: 400;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: 0.3s;

  &:hover {
    opacity: 0.6;
  }
`;

export const WalletWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #d9d9d9;
  padding-left: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
`;
