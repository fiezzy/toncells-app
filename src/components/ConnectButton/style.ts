import styled from "styled-components";
import theme from "../../constants/theme";

export const Wrapper = styled.button`
  border-radius: 20px;
  background-color: ${theme.color.mainBlue};
  color: #fff;
  padding: 12px 30px;
  transition: 0.3s;
  cursor: pointer;
  border: none;
  outline: none;

  &:hover {
    opacity: 0.7;
  }
`;
