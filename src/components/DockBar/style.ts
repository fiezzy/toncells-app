import styled from "styled-components";
import theme from "../../constants/theme";

export const Wrapper = styled.div`
  width: 70px;
  /* height: 400px; */
  position: fixed;
  top: 50%;
  transform: translate(0, -50%);
  right: 10px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
  padding: 12px 0px;
  /* opacity: 0.7; */
  transition: 0.3s;
  z-index: 99;
  user-select: none;

  svg {
    width: 18px;
    height: 18px;
  }

  a {
    text-decoration: none;
  }

  &:hover {
    opacity: 1;
  }

  @media screen and ${theme.device.tablet} {
    top: auto;
    right: 10vw;
    bottom: 0;
    height: 70px;
    width: 80vw;
    flex-direction: row;
    padding: 0px 12px;
    overflow: auto;
    transform: translate(0, -20%);
  }

  @media screen and (max-width: 805px) {
    justify-content: flex-start;
  }
`;

export const ConnectButton = styled.button`
  min-width: 50px;
  width: 50px;
  height: 50px;
  border: none;
  outline: none;
  /* background-color: #d9f2ff; */
  transition: 0.3s;
  font-weight: 600;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  span {
    color: #0088cc;
  }

  &:hover {
    transform: scale(1.06);
    box-shadow: 0px 0px 14px rgba(52, 186, 255, 0.25);
  }
`;

export const SupportButton = styled.button`
  min-width: 50px;
  width: 50px;
  height: 50px;
  outline: none;
  background-color: #fff;
  border: 1px solid #efefef;
  border-radius: 20px;
  font-weight: 600;
  transition: 0.3s;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    transform: scale(1.06);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  }
`;

export const Search = styled.div`
  min-width: 50px;
  width: 50px;
  height: 50px;
  background-color: #fff;
  border: 1px solid #efefef;
  border-radius: 20px;
  font-weight: 600;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  cursor: pointer;

  &:hover {
    transform: scale(1.06);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  }
  span {
    color: #0088cc;
  }
`;

export const Available = styled.div`
  min-width: 50px;
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 20px;
  font-weight: 600;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  font-size: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  span {
    color: #0088cc;
  }
`;
