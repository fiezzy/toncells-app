import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 64px;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.15);
    box-shadow: 0px 0px 10px 5px rgba(34, 60, 80, 0.36);
  }
`;
