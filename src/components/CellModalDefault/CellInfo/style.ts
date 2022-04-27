import styled from "styled-components";

const handleStatusColorChange = (status: string) => {
  switch (status) {
    case "Minted":
      return "#00FF1F";
    case "Reserved":
      return "red";
    case "Payed":
      return "Blue";
    default:
      return "#000";
  }
};

export const InfoBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 90%;
  // gap: 15px;
`;

export const InfoLabel = styled.p<{ status: string }>`
  font-weight: 900;
  font-size: 18px;
  line-height: 20px;
  text-align: center;

  span {
    font-weight: 400;
    color: ${({ status }) => handleStatusColorChange(status)};
  }
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
