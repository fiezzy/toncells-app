import styled from "styled-components";

export const Wrapper = styled.div`
  width: 70px;
  /* height: 400px; */
  position: fixed;
  top: 50%;
  transform: translate(0, -50%);
  right: 10px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 12px;
  padding: 12px 0px;
  /* opacity: 0.7; */
  transition: 0.3s;
  z-index: 99;

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
`;

export const ConnectButton = styled.button`
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
