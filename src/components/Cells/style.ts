import styled from "styled-components";

export const Wrapper = styled.div`
  width: 1650px;
  height: 1600px;
  margin: 0 auto 20px auto;
  display: flex;
  flex-wrap: wrap;
  margin-right: 50px;
`;

export const CellsAreaImg = styled.img`
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.5);
  }
`;
