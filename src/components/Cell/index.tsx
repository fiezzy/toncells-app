import { VFC } from "react";
import { Wrapper } from "./style";

type Props = {
	className?: string;
	handleClick: (id: number) => void;
	id: number;
	onMouseOver: any;
	onMouseOut?: any;
	selectedCells: any;
	// isSelected: boolean;
};

const Cell: VFC<any> = (props) => {
	const { handleClick, id, className, onMouseOver, onMouseOut, selectedCells } =
		props;

	return (
		<Wrapper
			className={className}
			onClick={() => handleClick(id)}
			onMouseOver={onMouseOver}
			onMouseOut={onMouseOut}
			style={{
				filter: !selectedCells.filter((e: number) => e === id)[0]
					? ""
					: "blur(0.5px) brightness(75%)",
			}}
		/>
	);
};

export default Cell;
