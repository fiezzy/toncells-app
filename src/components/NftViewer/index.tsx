import { VFC, useCallback, useState, useEffect } from "react";
import {
	Wrapper,
	Wrapper2,
	CloseBtn,
	SearchBox,
	Result,
	ResultWrapper,
} from "./style";
import { Modal } from "../Modal";
import { CLOSE_ICON } from "../../constants/images";
import { Input, Table } from "antd";
import { AudioOutlined } from "@ant-design/icons";

const { Search } = Input;

const SEPEZHO_LINK = "https://t.me/toncells_technical_support";

const columns = [
	{
		title: "ID",
		dataIndex: "ID",
		key: "ID",
		// render: text => <a>{text}</a>,
	},
	{
		title: "Status",
		dataIndex: "Status",
		key: "Status",
	},
	{
		title: "Hash",
		dataIndex: "Hash",
		key: "Hash",
	},
	{
		title: "Time",
		dataIndex: "Time",
		key: "Time",
	},

	// {
	//   title: 'Tags',
	//   key: 'tags',
	//   dataIndex: 'tags',
	//   render: tags => (
	//     <>
	//       {tags.map(tag => {
	//         let color = tag.length > 5 ? 'geekblue' : 'green';
	//         if (tag === 'loser') {
	//           color = 'volcano';
	//         }
	//         return (
	//           <Tag color={color} key={tag}>
	//             {tag.toUpperCase()}
	//           </Tag>
	//         );
	//       })}
	//     </>
	//   ),
	// },
];

// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     tags: ['loser'],
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   },
// ];

const NftViewer = (props: any) => {
	// const onSearch = (value) => console.log(value);
	const [search, setSearch] = useState("");
	const [res, setRes] = useState([]);

	useEffect(() => {
		if (props.bigArr?.status) {
			if (search)
				setRes(props.bigArr?.status.filter((e: any) => e.Wallet === search));
			if (!search) setRes(props.bigArr?.status);
		}
	}, [search, props.bigArr?.status]);

	return (
		<Modal isVisible={props.isBuyMode} onClose={props.toggleBuyMode}>
			{/* <Wrapper onClick={props.toggleBuyMode}> */}
			<Wrapper2>
				<CloseBtn onClick={props.toggleBuyMode}>
					<img src={CLOSE_ICON} alt="Close" />
				</CloseBtn>
				<SearchBox>
					<Search
						placeholder="input search text"
						onSearch={setSearch}
						enterButton
					/>
					<ResultWrapper>
						Total: {res.length}
						{/* {res?.map((e: any) => (
							<Result>
								{e.ID} / {e.Status} / {e.Hash} / {e.Time}
							</Result>
						))} */}
						<Table
							columns={columns}
							size="middle"
							dataSource={res}
							pagination={{ pageSize: 10 }}
						/>
					</ResultWrapper>
				</SearchBox>
			</Wrapper2>
			{/* </Wrapper> */}
		</Modal>
	);
};

export default NftViewer;
