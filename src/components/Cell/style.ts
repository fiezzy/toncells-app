import styled from "styled-components";
import theme from "../../constants/theme";

export const Wrapper = styled.div<{ selected: boolean }>`
  width: 14px;
  height: 14px;
  border: 1px solid ${theme.color.mainBlue};
  cursor: pointer;
  filter: ${({ selected }) => (selected ? "blur(0.5px) brightness(75%)" : "")};
  transition: 0.3s;
  background: #fff;
`;
