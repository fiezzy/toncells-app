export type ColorType =
  | "white"
  | "yellow"
  | "orange"
  | "red"
  | "pink"
  | "purple"
  | "blue"
  | "cyan"
  | "green"
  | "darkGreen"
  | "brown"
  | "lightBrown"
  | "lightGray"
  | "mediumGray"
  | "darkGray"
  | "black";

export type ColorsArrType = {
  id: number;
  color: ColorType;
  hex: string;
}[];

export type PixelType = {
  id: number;
  hex: string;
};
