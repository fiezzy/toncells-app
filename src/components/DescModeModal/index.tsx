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

				<SearchBox>

				Привет! Мы являемся командой из 7 человек, которая строит крутой проект под названием TonCells! Суть заключается в том, что в специальном поле 100x100 находятся NFT, которые ты можешь кастомизировать, то есть изменять описание, рисовать, вставить картинку, видео и вообще всё, что только захочешь! Если ты владеешь сразу несколькими NFT, то ты сможешь их изменять одновременно)

Технологии: мы не используем централизованный backend для хранения информации об NFT, а вся информация хранится в NFT напрямую, это сделано для оптимизации.

В дальнейшем мы планируем делать metaverse проект с интеграцией NFT на TON, который тоже заслужит вашего внимания!
<br /><br />
				Инструкция от А до Я: <br />
* Установите кошелек (для мака https://ton.app/wallets/macos-ton-wallet
для винды https://ton.app/wallets/windows-ton-wallet) <br />
* настройте кошелек под тестнет (троиточие сверху -> settings -> напишите в поле “Blockchain ID” слово “testnet”) <br />
* Переходим по ссылке  telegram бот — https://t.me/testgiver_ton_bot. и выдаем на свой тестнет кошелек 2 тона <br />
* Идем на сайт testnet.app.toncells.org  <br />
* Выбираем клетки <br />
* Нажимаем оплатить - ждем резирвации - нажимаем кнопку Buy via: “LINK”. Вас должно перекинуть в кошелек для совершения транзакции. <br />
* Ни в коем случае не меняем поле с мэсседжом в транзакции. Просто оплачиваем. <br />
* Возвращаемся на сайт и нажимаем “Im payed”. Ждем. <br />
* Как только увидите саксесс меседж можете покидать страницу. До этого момент ни в коем случае нельзя. <br />
* Через 5 минут можно перезайти и проверить айди своей клетки в Toncells Viewer (в сайдбаре кнопку найдете).  <br />


				</SearchBox>
			</Wrapper2>
			{/* </Wrapper> */}
		</Modal>
	);
};

export default DescModeModal;
