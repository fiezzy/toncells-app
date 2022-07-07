import styled from "styled-components";

export const Label = styled.span`
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: #000;
`;

export const ColorsWrapper = styled.div<{ isEdit: boolean }>`
  display: flex;
  flex-wrap: wrap;
  width: 322px;
  border: 1px solid #000;
  animation: ${({ isEdit }) => (isEdit ? "none" : "filter 3s infinite")};

  @keyframes filter {
    from {
      filter: grayscale(100%) blur(5px);
    }

    50% {
      filter: none;
    }

    to {
      filter: grayscale(100%) blur(5px);
    }
  }
`;

export const ColorBlock = styled.div<{ color: string; isEdit?: boolean }>`
  width: 40px;
  height: 40px;
  border: 0.6px solid #000;
  background-color: ${({ color }) => color};
  cursor: ${({ isEdit }) => (isEdit ? "pointer" : "auto")};
  transition: 0.3s;

  &:hover {
    transform: ${({ isEdit }) => (isEdit ? "scale(1.2)" : "scale(1)")};
  }
`;

export const SaveBtn = styled.div`
  border: none;
  outline: none;
  padding: 10px 65px;
  color: #fff;
  font-size: 16px;
  background-color: #000;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: scale(0.95);
    opacity: 0.6;
  }
`;

export const CurrentColorWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
