import styled from "styled-components";
import theme from "../../constants/theme";

export const Wrapper = styled.div<{
  selected: boolean;
  minted?: boolean;
  reserved: boolean;
  isNotActive: boolean;
  payed: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border: 1px solid ${theme.color.mainBlue};
  cursor: ${({ isNotActive }) => (isNotActive ? "not-allowed" : "pointer")};
  filter: ${({ selected }) => (selected ? "blur(0.5px) brightness(75%)" : "")};
  transition: 0.3s;
  background: ${({ minted, reserved, payed }) =>
    minted ? "#00FF1F" : reserved ? "red" : payed ? "#0080FF" : "#fff"};

  &:hover {
    transform: ${({ isNotActive }) => (isNotActive ? "none" : "scale(1.1)")};
    box-shadow: ${({ isNotActive }) =>
      isNotActive ? "none" : "0px 0px 25px rgba(0, 0, 0, 0.5)"};
  }
`;

export const CellIdLabel = styled.span`
  font-weight: 300;
  color: #000;
  opacity: 0.4;
  font-size: 16px;
`;
