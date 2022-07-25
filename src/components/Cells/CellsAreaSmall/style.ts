import styled from "styled-components";

export const Wrapper = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  outline: 1px solid #000;
  transition: 0.3s;
  cursor: ${({ isActive }) => (isActive ? "pointer" : "not-alowwed")};
  user-select: none;

  span {
    opacity: 0;
    color: #fff;
  }

  &:hover {
    box-shadow: ${({ isActive }) =>
      !isActive ? "none" : "0px 0px 25px rgba(0, 0, 0, 0.5)"};
    background: ${({ isActive }) =>
      !isActive ? "none" : "rgba(0, 0, 0, 0.65)"};

    span {
      opacity: 1;
    }
  }
`;
