import styled from "styled-components";
import theme from "./constants/theme";

export const CellsWrapperX = styled.div`
  width: 1720px;
  height: 1700px;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

export const CellsWrapperY = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const IconsX = styled.div`
  width: 60px;
  user-select: none;
  height: 1600px;
  background-color: #fff;
  margin-top: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 24px;
`;

export const IconsY = styled.div`
  width: 1600px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  user-select: none;
`;

export const NftIcon = styled.img`
  width: 40px;
  height: 40px;
`;

export const ZoomWrapper = styled.div<{ isZoomMode: boolean }>`
  transform: ${({ isZoomMode }) => (!isZoomMode ? "scale(0.45)" : "")};
  min-width: ${({ isZoomMode }) => (!isZoomMode ? "1720px" : "1830px")};
  height: 10px;
  z-index: 3;

  @media screen and ${theme.device.tablet} {
    transform: ${({ isZoomMode }) => (!isZoomMode ? "scale(0.30)" : "")};
    height: ${({ isZoomMode }) => (isZoomMode ? "507px" : "375px")};
  }

  @media screen and ${theme.device.mobile} {
    transform: ${({ isZoomMode }) => (!isZoomMode ? "scale(0.20)" : "")};
  }
`;

export const RootContainer = styled.div<{ isZoomMode: boolean }>`
  display: flex;
  justify-content: ${({ isZoomMode }) => (!isZoomMode ? "center" : "")};
  align-items: center;
  width: ${({ isZoomMode }) => (!isZoomMode ? "100vw" : "")};
  transition: all 0.3s ease-out;

  @media screen and ${theme.device.tablet} {
    height: ${({ isZoomMode }) => (isZoomMode ? "40vh" : "60vh")};
    align-items: center;
  }
`;
