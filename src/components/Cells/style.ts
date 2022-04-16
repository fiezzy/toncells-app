import styled from "styled-components";

export const Wrapper = styled.div`
  width: 1650px;
  height: 1600px;
  margin: 0 auto 20px auto;
  display: flex;
  flex-wrap: wrap;
  margin-right: 120px;
`;

export const CellInfo = styled.div`
  position: absolute;
  img {
    width: 24px;
    height: 24px;
  }
  margin: -32px -12px 32px 12px;
  border-radius: 10px;
  z-index: 10000;
  background: #fff;
  padding: 8px;
`

export const CellsArea = styled.div`
  transition: 0.3s;
  cursor: pointer;
  height: 64px;
  width: 64px;
  display: flex;
  flex: wrap;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.5);
  }
`;
