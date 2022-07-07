import styled from "styled-components";
import theme from "../../constants/theme";

export const Wrapper = styled.div`
  width: 920px;
  height: 532px;
  background-color: #fff;
  border-radius: 12px;
  padding: 28px 50px 50px 50px;
  position: relative;

  @media screen and ${theme.device.tablet} {
    width: 95vw;
    padding: 38px 38px 50px 38px;
  }

  @media screen and ${theme.device.mobile} {
    padding: 38px 0px;
    max-height: 85vh;
    overflow: auto;
    overflow-x: hidden;
  }
`;

export const ConnectWalletBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const ConnectWalletBtn = styled.button`
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

export const Label = styled.span`
  font-size: 14px;
  color: #000;
  opacity: 0.7;
  font-weight: 500;
`;

export const WalletTitle = styled.h4`
  font-size: 20px;
  color: #000;
  opacity: 0.9;
  font-weight: 500;
  margin: 0;
`;

export const Title = styled.h3`
  font-size: 32px;
  color: #000;
  font-weight: 900;
  text-align: center;
  margin: 0;
  margin-bottom: 10px;
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #000;
  opacity: 0.5;
  margin-bottom: 10px;
`;

export const CloseBtn = styled.div`
  cursor: pointer;
  transition: all 0.3s ease;
  position: absolute;
  right: 0;
  top: 0;
  margin: 38px;

  svg {
    width: 28px;
    height: 28px;
  }

  &:hover {
    transform: scale(0.95);
    opacity: 0.5;
  }
`;

export const CopyBtn = styled.button`
  border: none;
  outline: none;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
  background-color: #000;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: #fff;
  }

  &:hover {
    opacity: 0.5;
  }
`;

export const WalletWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  margin-top: -6px;
`;

export const ItemsWrapper = styled.div<{ isEmpty: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ isEmpty }) => (isEmpty ? "center" : "flex-start")};
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;
  height: 320px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;
