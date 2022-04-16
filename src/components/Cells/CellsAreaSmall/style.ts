import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 64px;
  height: 64px;
  outline: 1px solid #000;
  transition: 0.3s;

  &:hover {
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.5);
  }
`;

export const Cell = styled.div`
  width: 14px;
  height: 14px;
  border: 1px solid #000;
  background-color: #fff;
`;
