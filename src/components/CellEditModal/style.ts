import styled from "styled-components";
import theme from "../../constants/theme";

export const Wrapper = styled.div`
  width: 920px;
  background-color: #fff;
  border-radius: 12px;
  padding: 38px 50px 50px 50px;
  position: relative;

  @media screen and ${theme.device.tablet} {
    width: 95vw;
    padding: 38px 38px 50px 38px;
    height: 92vh;
  }

  @media screen and ${theme.device.mobile} {
    padding: 38px 0px;
    max-height: 85vh;
    overflow: auto;
    overflow-x: hidden;
  }
`;

export const Title = styled.p`
  font-weight: 700;
  font-size: 32px;
  line-height: 32px;
  text-align: center;

  span {
    font-weight: 200;
  }
`;

export const CloseBtn = styled.div`
  cursor: pointer;
  transition: all 0.3s ease;
  position: absolute;
  right: 0;
  top: 0;
  margin: 38px;
  svg {
    width: 28px;
    height: 28px;
  }
  &:hover {
    transform: scale(0.95);
    opacity: 0.5;
  }
`;

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and ${theme.device.tablet} {
    flex-direction: column;
    gap: 50px;
  }
`;

export const EditBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  justify-content: center;
  width: 50%;
`;

export const EditBlock = styled.div`
  display: flex;
  align-items: center;
  justify-conent: center;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const SubEditMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const SubMenuItem = styled.div<{ isActive: boolean }>`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #000;
  cursor: pointer;
  transition: 0.3s;
  border-bottom: ${({ isActive }) => (isActive ? "1px solid #000" : "none")};

  &:hover {
    opacity: 0.6;
  }
`;
