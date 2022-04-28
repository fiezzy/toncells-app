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
					<b> Инструкция от А до Я:</b> <br />
					* Установите кошелек (для мака
					https://ton.app/wallets/macos-ton-wallet для винды
					https://ton.app/wallets/windows-ton-wallet) <br />
					* настройте кошелек (закинте тоны или активируйте существующий) <br />
					* Идем на сайт app.toncells.org <br />
					* Выбираем клетки <br />* Нажимаем оплатить - ждем резирвации -
					нажимаем кнопку Buy via: “LINK”. Вас должно перекинуть в кошелек для
					совершения транзакции. <br />
					* Ни в коем случае не меняем поле с мэсседжом в транзакции. Просто
					оплачиваем. <br />
					* Возвращаемся на сайт и нажимаем “Im payed”. Ждем. <br />
					* Как только увидите саксесс меседж можете покидать страницу. До этого
					момент ни в коем случае нельзя. <br />
					* Через 5 минут можно перезайти и проверить айди своей клетки в
					Toncells Viewer (в сайдбаре кнопку найдете). <br />
					<br />
					<b>Важно:</b>
					<br />
					* Каждые 30мин происходит очистка всей карты от зарезервированых
					клеточек, которые были зарезервированы раньше чем 30мин назад
					<br />
					* Минт скрипт запускается раз в 5мин и проходит по всем invoicam
					которые скопились за 5 мин. Сам сприпт может работать больше 5мин.
					Если в течении часа ваша клетка не отминтилась, пишите в техподдержку.
					<br />
					* Перезагружайте страницу как можно чаще, чтоб не ловить баги :))))
					<br />
					* НО НЕ ПЕРЕЗАГРУЖАТЬ ВО ВРЕМЯ ОПЛАТЫ!!!!
					<br />
					* Если сделали оплату через наш сайт, и в транзакции лежит InvoiceID.
					Потом нажали im payed - ждите до последнего и не ПЕРЕЗАГРУЖАЙТЕ
					СТРАНИЦУ
					<br />
					* Если вы оплатили и у вас есть транзакция с Invoice в сообщении -
					пишите нам в поддержку. Мы решим вопрос
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
