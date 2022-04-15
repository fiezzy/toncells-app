import { VFC } from "react";
import { svgData } from "./svgData";

type Props = {
  id: number;
};

const CellsAreaSVG: VFC<Props> = (props) => {
  const { id } = props;

  // const changeFillColor = () => {
  //   svgData.forEach((cell) => {
  //     if (id === Number(cell.id)) {
  //       cell.fill = "#FF7A7A";

  //       return cell;
  //     }

  //     console.log(cell);

  //     return cell;
  //   });

  //   return svgData;
  // };

  // changeFillColor();

  return (
    <svg
      width="65"
      height="65"
      viewBox="0 0 65 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="65" height="65" fill="black" />
      {svgData.map(({ x, y, fill, id }) => (
        <rect key={id} x={x} y={y} width="15" height="15" fill={fill} id={id} />
      ))}
    </svg>
  );
};

export default CellsAreaSVG;
