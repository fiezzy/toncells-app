import styled from "styled-components";

export const Wrapper = styled.div`
  width: 65%;
  height: 80%;
  background-color: #fff;
  border-radius: 25px;
  padding: 35px 67px;
  position: relative;
`;

export const LabelId = styled.p`
  font-weight: 700;
  font-size: 50px;
  line-height: 59px;
  text-align: center;
`;

export const CloseBtn = styled.button`
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: absolute;
  right: 67px;
  top: 46px;

  &:hover {
    transform: scale(0.95);
    opacity: 0.5;
  }
`;
