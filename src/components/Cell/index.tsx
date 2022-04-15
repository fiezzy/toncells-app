import { VFC } from "react";
import { Wrapper } from "./style";

type Props = {
	className?: string;
	handleClick: (id: number) => void;
	id: number;
	isSelected: boolean;
};

const Cell: VFC<Props> = (props) => {
	const { handleClick, id, className } = props;

	return (
		<Wrapper
			className={className}
			onClick={() => handleClick(id)}
			style={{
				filter: !props.isSelected ? "" : "blur(0.5px) brightness(75%)",
			}}
		/>
	);
};

export default Cell;
