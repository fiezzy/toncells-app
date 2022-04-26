import styled from "styled-components";

export const CellsWrapperX = styled.div`
  width: 1720px;
  /* height: 900px; */
  height: 1700px;
  /* margin: 0 0; */
  /* top: 48px; */
  /* left: 0; */
  display: flex;
  gap: 20px;
  /* position: absolute; */
  justify-content: center;
  align-items: center;
  /* padding: 0 0 0 160px; */
`;

export const CellsWrapperY = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const IconsX = styled.div`
  width: 60px;
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
`;

export const NftIcon = styled.img`
  width: 40px;
  height: 40px;
`;

export const ZoomWrapper = styled.div<{ isZoomMode: boolean }>`
  transform: ${({ isZoomMode }) => (!isZoomMode ? "scale(0.45)" : "")};
  min-width: ${({ isZoomMode }) => (!isZoomMode ? "1720px" : "1830px")};
  height: 10px;
`;

export const RootContainer = styled.div<{ isZoomMode: boolean }>`
  display: flex;
  justify-content: ${({ isZoomMode }) => (!isZoomMode ? "center" : "")};
  width: ${({ isZoomMode }) => (!isZoomMode ? "100vw" : "")};
`