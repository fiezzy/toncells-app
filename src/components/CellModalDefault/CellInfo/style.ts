import styled from "styled-components";

export const InfoBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 90%;
  // gap: 15px;
`;

export const InfoLabel = styled.p`
  font-weight: 900;
  font-size: 18px;
  line-height: 20px;
  text-align: center;
`;

export const InfoText = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  overflow: scroll;
  height: 242px;
  color: rgba(0, 0, 0, 0.6);

  span {
    font-weight: 900;
    color: #000;
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
