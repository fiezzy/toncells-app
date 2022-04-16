import styled from "styled-components";

export const Wrapper = styled.div`
  width: 120px;
  height: 450px;
  position: fixed;
  top: 23vh;
  right: 20px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  padding: 15px 0px;
  opacity: 0.7;
  transition: 0.3s;

  a {
    text-decoration: none;
  }

  &:hover {
    opacity: 1;
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
