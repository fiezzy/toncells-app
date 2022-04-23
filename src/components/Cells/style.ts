import styled from "styled-components";

export const Wrapper = styled.div`
  width: 1600px;
  height: 1600px;
  margin: 0 auto 0 auto;
  display: flex;
  flex-wrap: wrap;
  margin-right: 160px;
  /* background-image: url('../../test1.png'); */
  /* border: 1px solid #000; */
  img {
    width: 1600px;
    height: 1600px;
    position: absolute;
    /* resize-mode: contain; */
    z-index: 9;
  }
`;

export const CellInfo = styled.div`
  position: absolute;
  > img {
    width: 24px !important;
  position: relative !important;
    height: 24px !important;
  }
  /* margin: -32px -12px 32px 12px; */
  border-radius: 10px !important;
  z-index: 99999;
  background: #fff;
  padding: 8px !important;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
  /* transform: scale(2); */
`;

export const CellsArea = styled.div`
  transition: 0.3s;
  cursor: pointer;
  height: 64px;
  width: 64px;
  display: flex;
  flex: wrap;

  &:hover {
    /* transform: scale(1.1); */
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.5);
  }
`;
