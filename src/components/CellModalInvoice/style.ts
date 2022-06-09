import styled from "styled-components";
import theme from "../../constants/theme";

export const Wrapper = styled.div`
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

export const LabelId = styled.p`
  font-weight: 700;
  font-size: 32px;
  line-height: 32px;
  text-align: center;
  margin-bottom: 40px;

  @media screen and ${theme.device.tablet} {
    font-size: 24px;
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

export const Cell = styled.div`
  /* width: 485px;
  height: 476px; */
  /* background-color: #fff;
  margin: 0 auto;
  width: 380px;
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
  width: 380px;
  height: 380px; */

  /* filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5)); */
`;

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;

  @media screen and ${theme.device.tablet} {
    flex-direction: column;
    gap: 40px;
  }
`;

export const InfoBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const InfoLabel = styled.span`
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
`;

export const InfoText = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  max-width: 350px;
  max-height: 100px;
  overflow-y: scroll;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 16px;

  span {
    font-weight: 900;
  }
`;

export const BuyButton = styled.button`
  /* /* margin-top: 50px; * */
  border: none;
  outline: none;
  padding: 10px 65px;
  color: #fff;
  font-size: 16px;
  /* font-weight: 400; */
  background-color: #000;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s;
  margin: 12px;

  &:hover {
    transform: scale(0.95);
    opacity: 0.6;
  }

  @media screen and ${theme.device.mobile} {
    margin: 0;
  }
`;

export const BtnsWrapper = styled.div`
  display: flex;
  gap: 100px;
  align-items: center;

  @media screen and ${theme.device.mobile} {
    flex-direction: column;
    justify-content: center;
    gap: 20px;
  }
`;
