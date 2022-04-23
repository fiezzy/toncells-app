import { VFC, useCallback, useState, useEffect } from "react";
import * as dayjs from "dayjs";
import {
	Wrapper,
	Wrapper2,
	CloseBtn,
	SearchBox,
	Result,
	ResultWrapper,
	LabelId,
} from "./style";
import { Modal } from "../Modal";
import { CLOSE_ICON } from "../../constants/images";
import { Input, Table } from "antd";
import { CloseOutlined } from "@ant-design/icons";

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
		title: "Wallet",
		dataIndex: "Wallet",
		key: "Wallet",
		render: (text: string) => (
			//@ts-ignore
			<a href={`https://testnet.tonscan.org/address/${text}`}>{text}</a>
		),
	},
	{
		title: "Hash",
		dataIndex: "Hash",
		key: "Hash",
		render: (text: string) => (
			//@ts-ignore
			<a href={`https://testnet.explorer.tonnft.tools/nft/${text}`}>{text}</a>
		),
	},
	{
		title: "Time",
		dataIndex: "Time",
		key: "Time",
		render: (text: string) => (
			//@ts-ignore
			<>{text === 10 ? "" : dayjs(text).format("DD/M/YYYY (HH:MM:ss)")}</>
		),
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
	const [search1, setSearch1] = useState("");
	const [search2, setSearch2] = useState("");
	const [res, setRes] = useState([]);
	useEffect(() => {
		if (props.bigArr?.status) {
			if (search)
				setRes(props.bigArr?.status.filter((e: any) => e.Wallet === search));
			if (!search) setRes(props.bigArr?.status);
		}
	}, [search, props.bigArr?.status]);

	useEffect(() => {
		if (props.bigArr?.status) {
			if (search1)
				setRes(
					props.bigArr?.status.filter(
						(e: any) => Number(e.ID) === Number(search1)
					)
				);
			if (!search1) setRes(props.bigArr?.status);
		}
	}, [search1, props.bigArr?.status]);

	useEffect(() => {
		if (props.bigArr?.status) {
			if (search2)
				setRes(props.bigArr?.status.filter((e: any) => e.Status === search2));
			if (!search2) setRes(props.bigArr?.status);
		}
	}, [search2, props.bigArr?.status]);

	return (
		<Modal isVisible={props.isBuyMode} onClose={props.toggleBuyMode}>
			{/* <Wrapper onClick={props.toggleBuyMode}> */}
			<Wrapper2>
				<CloseBtn onClick={props.toggleBuyMode}>
					<CloseOutlined />
				</CloseBtn>
				<LabelId>Toncells viewer</LabelId>

				<SearchBox>
					<p>
						<Search placeholder="WALLET" onSearch={setSearch} enterButton />
						<Search placeholder="ID" onSearch={setSearch1} enterButton />
						<Search placeholder="STATUS" onSearch={setSearch2} enterButton />
					</p>
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
							pagination={{
								defaultPageSize: 5,
								pageSizeOptions: [5, 10, 20, 50, 100],
							}}
							dataSource={res}
							scroll={{ x: true, y: 260 }}
						/>
					</ResultWrapper>
				</SearchBox>
			</Wrapper2>
			{/* </Wrapper> */}
		</Modal>
	);
};

export default NftViewer;
