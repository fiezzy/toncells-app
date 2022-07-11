import styled from "styled-components";
import theme from "../../../../constants/theme";

export const Wrapper = styled.div<{ isEdit: boolean }>`
  display: flex;
  flex-wrap: wrap;
  width: 384px;
  height: 384px;
  transition: 0.3s;
  transform: ${({ isEdit }) => (isEdit ? "scale(1.05)" : "scale(1)")};
  box-shadow: ${({ isEdit }) =>
    isEdit ? "0px 0px 25px rgba(0, 0, 0, 0.5)" : "none"};

  @media screen and ${theme.device.tablet} {
    width: 320px;
    height: 320px;
  }
`;

export const EditablePixel = styled.div<{ hex: string; isEdit: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
  cursor: ${({ isEdit }) => (isEdit ? "pointer" : "auto")};
  width: 24px;
  height: 24px;
  transition: 0.3s;
  background-color: ${({ hex }) => hex};

  &:hover {
    transform: ${({ isEdit }) => (isEdit ? "scale(1.1)" : "scale(1)")};
    box-shadow: ${({ isEdit }) =>
      isEdit ? "0px 0px 25px rgba(0, 0, 0, 0.5)" : "none"};
  }

  @media screen and ${theme.device.tablet} {
    width: 80px;
    height: 80px;
  }
`;
