import styled from "styled-components";
import theme from "../../constants/theme";

// export const Wrapper = styled.div`
//   position: fixed;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   width: 100vw;
//   z-index: 9999;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: rgba(0, 0, 0, 0.25);
//   animation-name: appear;
//   animation-duration: 300ms;
// `;

export const Wrapper = styled.div`
  width: 65%;
  position: fixed;
  /* max-height: 800px; */
  /* overflow-y: scroll; */
  background-color: #fff;
  border-radius: 25px;
  padding: 35px 67px 115px 67px;
  position: relative;
  width: 920px;
  /* max-height: 520px; */
  background-color: #fff;
  border-radius: 12px;
  padding: 38px;
  position: relative;

  @media screen and ${theme.device.tablet} {
    width: 90vw;
    max-height: 85vh;
    overflow: auto;
  }
`;

export const CloseBtn = styled.div`
  cursor: pointer;
  transition: all 0.3s ease;
  position: absolute;
  right: 38px;
  top: 38px;

  svg {
    width: 28px;
    height: 28px;
  }
  &:hover {
    transform: scale(0.95);
    opacity: 0.5;
  }

  @media screen and ${theme.device.mobile} {
    top: 41px;
    right: 26px;
  }
`;

export const ConnectButton = styled.button`
  width: 80px;
  height: 80px;
  border: none;
  outline: none;
  background-color: #d9f2ff;
  transition: 0.3s;
  font-weight: 600;
  border-radius: 20px;
  cursor: pointer;

  span {
    color: #0088cc;
  }

  &:hover {
    transform: scale(1.06);
    box-shadow: 0px 0px 14px rgba(52, 186, 255, 0.25);
  }
`;

export const SupportButton = styled.button`
  width: 80px;
  height: 80px;
  outline: none;
  background-color: #fff;
  border: 1px solid #efefef;
  border-radius: 20px;
  font-weight: 600;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.06);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  }
`;

export const Available = styled.div`
  width: 80px;
  height: 80px;
  background-color: #fff;
  border: 1px solid #efefef;
  border-radius: 20px;
  font-weight: 600;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  span {
    color: #0088cc;
  }
`;

export const SearchBox = styled.div`
  margin: 40px 0 0 0;

  > p {
    display: flex;

    > * {
      margin: 10px;
    }
  }

  @media screen and ${theme.device.mobile} {
    > p {
      flex-direction: column;
    }
  }
`;

export const Result = styled.div`
  /* margin: 100px 0 0 0; */
`;

export const ResultWrapper = styled.div`
  margin: 24px 0 0 0;
  max-height: 360px;
  min-height: 360px;
  /* padding: 0 0 100px 0; */
`;

export const LabelId = styled.p`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
`;

// MAPFREE
// MAPMINTED
