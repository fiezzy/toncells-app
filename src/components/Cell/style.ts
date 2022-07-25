import styled from "styled-components";
import theme from "../../constants/theme";

// const getColor = (status: string) => {
//   switch (status) {
//     case "minted":
//       return "#00FF1F";
//     case "reserved":
//       return "red";
//     case "payed":
//       return "#0080FF";
//     default:
//       return "none";
//   }
// };

const getBgColor = (status: string, isEdited?: boolean) => {
  switch (status) {
    case "minted":
      return isEdited ? "none" : "#00FF1F";
    case "reserved":
      return "rgba(255, 0, 0, 0.35)";
    case "payed":
      return "rgba(31, 120, 255, 0.54)";
    case "selected":
      return "rgba(0, 0, 0, 0.65)";
    default:
      return "none";
  }
};

const getHoverBgColor = (status: string, isEdited?: boolean) => {
  switch (status) {
    case "minted":
      return isEdited ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 255, 0, 0.48)";
    case "reserved":
      return "rgba(255, 0, 0, 0.35)";
    case "payed":
      return "rgba(31, 120, 255, 0.54)";
    case "selected":
      return "rgba(0, 0, 0, 0.35)";
    default:
      return "none";
  }
};

export const Wrapper = styled.div<{
  status: string;
  isNotActive: boolean;
  isEdited?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95px;
  height: 95px;
  border: 1px solid #000;
  cursor: ${({ isNotActive }) => (isNotActive ? "not-allowed" : "pointer")};

  transition: 0.3s;
  background: none;
  font-weight: ${({ status }) => (status === "selected" ? "500" : "300")};
  color: ${({ status }) => (status === "selected" ? "#fff" : "#000")};
  background: ${({ status, isEdited }) => getBgColor(status, isEdited)};
  opacity: 1;
  font-size: 16px;

  span {
    opacity: ${({ isEdited }) => (isEdited ? "0" : "1")};
  }

  &:hover {
    box-shadow: ${({ isNotActive }) =>
      isNotActive ? "none" : "0px 0px 25px rgba(0, 0, 0, 0.5)"};
    font-weight: ${({ isNotActive }) => (isNotActive ? "300" : "500")};
    background: ${({ status, isEdited }) => getHoverBgColor(status, isEdited)};
    color: ${({ isEdited }) => (isEdited ? "#fff" : "#000")};

    span {
      opacity: 1;
    }
  }
`;

// filter: ${({ selected }) =>
// selected ? "blur(0.5px) brightness(75%)" : ""};

// background-color: ${({ isNotActive, isEdited }) =>
//       isNotActive ? "none" : "rgba(0, 0, 0, 0.35)"};
