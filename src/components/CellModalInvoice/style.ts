import styled from "styled-components";

export const Wrapper = styled.div`
  width: 65%;
  max-height: 725px;
  background-color: #fff;
  border-radius: 25px;
  padding: 35px 67px 115px 67px;
  position: relative;
`;

export const LabelId = styled.p`
  font-weight: 700;
  font-size: 50px;
  line-height: 59px;
  text-align: center;
  margin-bottom: 40px;
`;

export const CloseBtn = styled.button`
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: absolute;
  right: 67px;
  top: 46px;

  &:hover {
    transform: scale(0.95);
    opacity: 0.5;
  }
`;

export const Cell = styled.div`
  width: 485px;
  height: 476px;
  background-color: #fff;
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
`;

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const InfoBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 43%;
  gap: 30px;
`;

export const InfoLabel = styled.p`
  font-weight: 900;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
`;

export const InfoText = styled.p`
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  text-align: center;

  span {
    font-weight: 900;
  }
`;

export const BuyButton = styled.button`
  border: none;
  outline: none;
  padding: 10px 65px;
  color: #fff;
  font-size: 20px;
  font-weight: 400;
  background-color: #000;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: scale(0.95);
    opacity: 0.6;
  }
`;
