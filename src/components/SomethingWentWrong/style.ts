import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ErrorWrapper = styled.div`
  padding: 25px;
  border-radius: 12px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  text-align: center;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 900;
  color: red;
  opacity: 0.6;
  text-transform: uppercase;
`;

export const Description = styled.p`
  margin: 0;
  font-size: 17px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 500;
`;
