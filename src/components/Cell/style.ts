import styled from "styled-components";
import theme from "../../constants/theme";

export const Wrapper = styled.div`
  width: 14px;
  height: 14px;
  border: 1px solid ${theme.color.mainBlue};
  cursor: pointer;
  background: #fff;

  &:hover {
    background-color: ${theme.color.mainBlue};
    opacity: 0.6;
  }
`;
