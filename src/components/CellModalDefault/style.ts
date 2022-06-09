import styled from "styled-components";
import theme from "../../constants/theme";

export const Wrapper = styled.div`
  width: 920px;
  /* max-height: 520px; */
  background-color: #fff;
  border-radius: 12px;
  padding: 38px 50px 50px 50px;
  position: relative;

  @media screen and ${theme.device.tablet} {
    width: 95vw;
    padding: 38px 38px 50px 38px;
  }

  @media screen and ${theme.device.mobile} {
    padding: 38px 0px;
    max-height: 85vh;
    overflow: auto;
    overflow-x: hidden;
  }
`;

export const LabelId = styled.p`
  font-weight: 700;
  font-size: 32px;
  line-height: 32px;
  text-align: center;
  /* margin-bottom: 40px; */
`;

export const CloseBtn = styled.div`
  cursor: pointer;
  transition: all 0.3s ease;
  position: absolute;
  right: 0;
  top: 0;
  margin: 38px;
  svg {
    width: 28px;
    height: 28px;
  }
  &:hover {
    transform: scale(0.95);
    opacity: 0.5;
  }
`;

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and ${theme.device.tablet} {
    flex-direction: column;
    gap: 30px;
  }
`;

export const InfoBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 380px;

  /* width: 43%; */
  /* background: green; */
  margin: 0 auto;
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

  span {
    font-weight: 900;
  }
`;

export const BuyFewBtn = styled.button`
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

  &:hover {
    transform: scale(0.95);
    opacity: 0.6;
  }
`;

export const ColumnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  width: 50%;

  @media screen and ${theme.device.tablet} {
    width: 80%;
  }
`;
