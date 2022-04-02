import styled from "styled-components";
import Cell from "../Cell";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 485px;
  height: 476px;
`;

export const StyledCell = styled(Cell)`
  width: 119px;
  height: 119px;
  transition: 0.3s;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.5);
  }
`;
