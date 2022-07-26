import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  justify-content: flex-start;
  overflow: scroll;
  overflow-x: hidden;
  width: 100%;
  height: 242px;
  word-wrap: break-word;
`;

export const Label = styled.span`
  font-size: 14px;
  color: #000;
  font-weight: 700;
  margin: 0;
  padding: 0;
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;

  pre {
    white-space: pre-wrap;
  }
`;

export const Field = styled.input<{ disabled: boolean }>`
  width: 100%;
  padding: 5px 15px;
  color: #000;
  border-radius: 10px;
  background-color: #e8e6e6;
  border: none;
  outline: none;
  opacity: ${({ disabled }) => (disabled ? "0.2" : "1")};
`;

export const FieldValueLabel = styled.a`
  font-weight: 400;
  font-size: 19px;
  color: #000;
`;

export const DescriptionArea = styled.textarea`
  height: 200px;
  resize: none;
  border-radius: 10px;
  padding: 10px;
  background-color: #e8e6e6;
  border: none;
  outline: none;
`;

export const EditBtn = styled.button`
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
