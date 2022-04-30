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
				<LabelId>Toncells info</LabelId>

				<SearchBox>
					<br />
					<br />
					<b> Инструкция от А до Я для MAINNET:</b> <br />
					* Установите и настройте TON кошелек (можно и на телефоне / можно на
					пк / можно расширение на браузер)
					<br />
					* Выбираем клетки <br />* Нажимаем оплатить - ждем резирвации -
					сканируем QR-код с телефона (или нажимаем кнопки в зависимости от
					вашего кошелька) <br />* На телефоне вас перекинет в Tonkeeper (ТОН
					кошель). Открываем. <br />
					* Ни в коем случае не меняем поле с мэсседжом в транзакции (инфа в нем
					нужна для работы скриптов. Ничего не удаляем и не добавляем). Просто
					оплачиваем. <br />
					* Возвращаемся на сайт и нажимаем “I paid". Ждем. <br />
					* Как только увидите саксесс меседж можете переходить к оплате след
					клеток.
					<br />
					* Через 5 минут можно перезайти и проверить айди своей клетки в
					Toncells Viewer (в сайдбаре кнопка лупы). <br />
					<br />
					<b>Важно:</b>
					<br />
					* Каждые 30мин происходит очистка всей карты от зарезервированых
					клеточек, которые были зарезервированы раньше чем 30мин назад
					<br />
					* Минт скрипт запускается раз в 5мин и проходит по всем инвоисам
					которые скопились за 5 мин. Сам скрипт может работать больше 5мин.
					Если в течении часа ваша клетка не отминтилась, пишите в техподдержку.
					<br />
					* Перезагружайте страницу как можно чаще, чтоб не ловить баги :)))) *
					Если баг с отображением чего-то. Или на поле не отображается ваша
					клетка - перезагрузите страницу. Если не помогло перезагрузите еще раз
					через 5мин. Если ничего не меняется пишите нам.
					<br />
					* Помните, сайт в бета версии!!!
					<br />
					<br />
					PS всех обнял, сепежо :)
				</SearchBox>
			</Wrapper2>
			{/* </Wrapper> */}
		</Modal>
	);
};

export default DescModeModal;
