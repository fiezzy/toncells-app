import styled from "styled-components";

export const Wrapper = styled.div`
  width: 19%;
  height: 220px;
  border-radius: 25px;
  position: relative;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  background-color: #626262;
  color: #fff;
  cursor: pointer;

  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25),
    inset 0px 0px 12px rgba(0, 0, 0, 0.35);

  &:hover {
    transform: scale(0.97);
    opacity: 0.76;
  }
`;

export const NftImage = styled.img`
  width: 100%;
  height: 80%;
  border-radius: 15px;
`;

export const BottomBlock = styled.div`
  width: 100%;
  height: 20%;
  background-color: #000;
  border-radius: 0px 0px 15px 15px;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

export const BtnsWrapper = styled.div`
  widht: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;

export const Button = styled.button`
  border: none;
  outline: none;
  padding: 5px 35px;
  background-color: #000;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.7;
  }
`;
