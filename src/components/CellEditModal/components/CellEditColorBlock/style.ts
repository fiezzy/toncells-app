import styled from "styled-components";

function hexToRgbA(hex: string) {
  let c: any;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ",0.4)"
    );
  }
}

export const Label = styled.span`
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: #000;
`;

export const ColorsWrapper = styled.div<{ isEdit: boolean }>`
  // border: 1px solid #000;
  animation: ${({ isEdit }) => (isEdit ? "none" : "filter 3s infinite")};
  border-radius: 10px;
  // overflow-y: auto;
  // max-height: 242px;

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

export const ColorBlock = styled.div<{ color: any; isEdit?: boolean }>`
  width: 28px;
  height: 28px;
  border: 0.6px solid #000;
  background-color: ${({ color }) => color};
  cursor: ${({ isEdit }) => (isEdit ? "pointer" : "auto")};
  transition: 0.3s;

  &:hover {
    transform: ${({ isEdit }) => (isEdit ? "scale(1.2)" : "scale(1)")};
  }
`;

export const SaveBtn = styled.div<{
  color: string;
  isGettingSignature?: boolean;
}>`
  border: none;
  outline: none;
  width: 282px;
  text-align: center;
  padding: 10px 65px;
  color: #000;
  font-size: 16px;
  background-color: ${({ isGettingSignature, color }) =>
    isGettingSignature ? hexToRgbA(color) : "#fff"};
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
  border: 2px solid rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${({ color }) => hexToRgbA(color)};
    border: 2px solid rgba(0, 0, 0, 0.3);
  }
`;

export const CurrentColorWrapper = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
`;

export const CurrentColorBlock = styled.div<{ color: any }>`
  width: 222px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  background-color: ${({ color }) => color};
  margin-top: -15px;
  transition: all 0.3s;
`;

export const ClearAllBtn = styled.div`
  width: 52px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  // padding: 20px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #ff5555;
  margin-top: -15px;
  transition: all 0.3s;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background-color: #ffa6a6;
    border: 2px solid #ff5555;
  }
`;
