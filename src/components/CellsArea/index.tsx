import { VFC, memo } from "react";
import { Wrapper, StyledCell } from "./style";

const cellsCollection: any[] = [];

for (let i = 0; i < 16; i++) {
	cellsCollection.push({
		id: i + 1,
	});
}

type Props = {
	toggleBuyMode: () => void;
	handleCellClick: (id: number) => void;
	selectedIds: Array<number>;
};

const CellsArea: VFC<Props> = memo((props) => {
	const { toggleBuyMode, handleCellClick } = props;

	const handleClick = (id: number) => {
		toggleBuyMode();
		handleCellClick(id);
	};

	return (
		<Wrapper>
			{cellsCollection.map(({ id }) => (
				<StyledCell
					// style={{
					// }}
					isSelected={!!props.selectedIds.filter((e) => e === id)[0]}
					key={id}
					handleClick={() => handleClick(id)}
					id={id}
				/>
			))}
		</Wrapper>
	);
});

export default CellsArea;
