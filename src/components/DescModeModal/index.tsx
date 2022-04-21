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

const DescModeModal = (props: any) => {
	return (
		<Modal isVisible={props.isDescMode} onClose={props.toggleDescMode}>
			{/* <Wrapper onClick={props.toggleBuyMode}> */}
			<Wrapper2>
				<CloseBtn onClick={props.toggleDescMode}>
					<CloseOutlined />
				</CloseBtn>
				<LabelId>About toncells</LabelId>

				<SearchBox>Lorem ispum</SearchBox>
			</Wrapper2>
			{/* </Wrapper> */}
		</Modal>
	);
};

export default DescModeModal;
