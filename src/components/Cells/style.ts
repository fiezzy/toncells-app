import styled from "styled-components";

export const Wrapper = styled.div`
  width: 1600px;
  height: 1600px;
  display: flex;
  flex-wrap: wrap;

  img {
    width: 1600px;
    height: 1600px;
    position: absolute;
    z-index: 9;
    user-select: none;
  }
`;

export const CellInfo = styled.div`
  position: absolute;

  > img {
    width: 24px !important;
    position: relative !important;
    height: 24px !important;
  }

  border-radius: 10px !important;
  z-index: 99999;
  background: #fff;
  padding: 8px !important;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
  min-width: 64px;
  max-width: 64px;
`;

export const CellsArea = styled.div`
  transition: 0.3s;
  cursor: pointer;
  height: 64px;
  width: 64px;
  display: flex;
  flex: wrap;

  &:hover {
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.5);
  }
`;

export const Text = styled.div`
  position: absolute;
  top: 850px;
  left: 860px;
  transform: translate(-50%, -50%);
  z-index: 100;
  color: white;
  font-size: 50px;
  font-style: italic;
  user-select: none;
`;
