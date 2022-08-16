import { ColorsArrType } from "./types";

export const colorsArr: ColorsArrType = [
  {
    id: 1,
    color: "white",
    hex: "#FFFFFF",
  },
  {
    id: 2,
    color: "yellow",
    hex: "#FCF400",
  },
  {
    id: 3,
    color: "orange",
    hex: "#FF6400",
  },
  {
    id: 4,
    color: "red",
    hex: "#DD0202",
  },
  {
    id: 5,
    color: "pink",
    hex: "#F00285",
  },
  {
    id: 6,
    color: "purple",
    hex: "#4600A5",
  },
  {
    id: 7,
    color: "blue",
    hex: "#0000D5",
  },
  {
    id: 8,
    color: "cyan",
    hex: "#00AEE9",
  },
  {
    id: 9,
    color: "green",
    hex: "#1AB90C",
  },
  {
    id: 10,
    color: "darkGreen",
    hex: "#006407",
  },
  {
    id: 11,
    color: "brown",
    hex: "#572800",
  },
  {
    id: 12,
    color: "lightBrown",
    hex: "#917035",
  },
  {
    id: 13,
    color: "lightGray",
    hex: "#C1C1C1",
  },
  {
    id: 14,
    color: "mediumGray",
    hex: "#818181",
  },
  {
    id: 15,
    color: "darkGray",
    hex: "#3E3E3E",
  },
  {
    id: 16,
    color: "black",
    hex: "#000000",
  },
];

const colorsStrV2 =
  "#788084#0000FC#0000C4#4028C4#94008C#AC0028#AC1000#8C1800#503000#007800#006800#005800#004058#000000#BCC0C4#0078FC#0088FC#6848FC#DC00D4#E40060#FC3800#E46018#AC8000#00B800#00A800#00A848#008894#000000#FCF8FC#38C0FC#6888FC#9C78FC#FC78FC#FC589C#FC7858#FCA048#FCB800#BCF818#58D858#58F89C#00E8E4#000000#FFFFFF#A4E8FC#BCB8FC#DCB8FC#FCB8FC#F4C0E0#F4D0B4#FCE0B4#FCD884#DCF878#B8F878#B0F0D8#00F8FC#000000";

export const colorsArrV2 = colorsStrV2.match(/.{1,7}/g);
