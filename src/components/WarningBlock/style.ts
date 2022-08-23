import styled from "styled-components";
import { WarningOutlined } from "@ant-design/icons";

export const Wrapper = styled.div`
  border-radius: 5px;
  border: 1px solid #ffdb96;
  background-color: #fff;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  width: 100%;
  gap: 15px;
`;

export const Label = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 15px;
  color: rgba(0, 0, 0, 0.56);
`;

export const WarningIcon = styled(WarningOutlined)`
  color: #ffdb96;

  svg {
    width: 20px;
    height: 20px;
  }
`;
