import { useEffect, VFC } from "react";
import { Wrapper, Cell } from "./style";

const cellsCollection: any[] = [];

type Props = {
	firstCellId: number;
	lastCellId: number;
};

const CellsAreaSmall: VFC<Props> = (props) => {
	const { firstCellId, lastCellId } = props;

	useEffect(() => {
		// let i = 0;
		// for (let i = firstCellId; i < lastCellId; i++) {
		// 	cellsCollection.push({
		// 		id: i,
		// 	});
		// }
	});

	return (
		<Wrapper>
			{/* {cellsCollection.map((cell) => (
				<Cell key={cell.id} />
			))} */}
		</Wrapper>
	);
};

export default CellsAreaSmall;
