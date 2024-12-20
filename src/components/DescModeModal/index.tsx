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
				<LabelId>About old toncells </LabelId>

				<SearchBox>
use
					<a href="https://app.toncells.org">toncells v2!</a>	
<br />
					Toncells is an NFT project built on blockchain TON. The main idea is
					that each cell is linked to a specific NFT from the collection. NFT
					owners can customize (upload pictures / draw / add links / tg
					usernames / change description) their cells. You can mint NFT on this
					site or buy from the secon-hend market.
					<br />
					--------
					<br />* our landing page:{" "}
					<a href="https://toncells.org">toncells.org</a>
					<br />* our twitter:{" "}
					<a href="https://twitter.com/toncells">@toncells</a>
					<br />* our tg channer (ru):{" "}
					<a href="https://t.me/toncells">@toncells</a>
					<br />* our tg channer (eng):{" "}
					<a href="https://t.me/toncellseng">@toncellseng</a>
					<br />* founder: <a href="https://t.me/sepezho">@sepezho</a>
					<br />
					--------
					<br />
					Toncells version: 1.5.98 (beta)
				</SearchBox>
			</Wrapper2>
			{/* </Wrapper> */}
		</Modal>
	);
};

export default DescModeModal;

// <SearchBox>
// <i>
// 	{" "}
// 	<b>
// 		Вся важная инфа по этому сайту (этот блок со скролом вниз):
// 	</b>{" "}
// </i>
// <br />
// <br />
// <b>~~Инструкция от А до Я для MAINNET~~</b> <br />
// * Установите и настройте TON кошелек (можно и на телефоне / можно на
// пк / можно расширение на браузер)
// <br />* Выбираем клетки. Можно выбрать{" "}
// <b>
// 	<i>конкретную клетку</i>
// </b>
// : на поле нажимаете на область -&gt; кликаем select cells -&gt;
// выбираете свободную клетку. Или можно{" "}
// <b>
// 	<i>покупать областями (в каждой 16нфт)</i>
// </b>
// : кнопка с квадратиками в сайдбаре -&gt; выбираем нужные области -&gt;
// нажимаем "Mint IDs!" в сайдбаре.
// <br />* Нажимаем оплатить - ждем резирвации - сканируем QR-код с
// телефона (или нажимаем кнопки в зависимости от вашего кошелька. Если
// поставили кошель на пк - нажимаем "Link" - это ссыль на оплату, вас
// перекинет в приложение кошеля на пк) <br />* После скана QR на
// телефоне вас перекинет в Tonkeeper (ТОН кошель). Открываем. <br />*
// <b>
// 	<i> Ни в коем случае не меняем поле с мэсседжом в транзакции</i>
// </b>{" "}
// (инфа в нем нужна для работы скриптов. Ничего не удаляем и не
// добавляем). Просто оплачиваем. <br />
// * Возвращаемся на сайт и нажимаем “I paid". Ждем. <br />
// * Как только увидите саксесс меседж можете переходить к оплате след
// клеток.
// <br />
// * Через 5 минут можно перезайти и проверить айди своей клетки в
// Toncells Viewer (в сайдбаре кнопка лупы). <br />
// <br />
// <b>~~Сайдбар~~</b>
// <br />*<i> значек иены в стрелочках</i> - появляется выше всех и
// выделен серым. Появляется только тогда, когда у тебя есть неоплаченый
// (или не отмененый) Invoice на оплату. Если случайно закрыл сайте при
// оплате, появится эта кнопка для продолжения процесса оплаты.
// <br />* <i>стрелочки в центр </i>- приближение карты / отдаление карты
// <br />* <i>кубики с плюсиком </i>- селект областей для покупки
// <br />* <i>лупа </i>- TonCells Viewer (таблица с поиском по ней, можно
// отследить любую инфу по нашим нфт)
// <br />* <i>три полоски </i>- разные виды карты (1 - стандарт / 2 - все
// свободные области зеленым / 3 - все отминчиные зеленым)
// <br />* <i>"i" </i>- эта модалка
// <br />* <i>вопрос </i>- ссылка на техподдержку
// <br />
// <br />
// <b>~~Важно~~</b>
// <br />
// * Каждые 30мин происходит очистка всей карты от зарезервированых
// клеточек, которые были зарезервированы раньше чем 30мин назад
// <br />
// * Минт скрипт запускается раз в 5мин и проходит по всем инвоисам
// которые скопились за 5 мин. Сам скрипт может работать больше 5мин.
// Если в течении часа ваша клетка не отминтилась, пишите в техподдержку.
// <br />* Перезагружайте страницу как можно чаще, чтоб не ловить баги
// :)))) <br />* Если баг с отображением чего-то. Или на поле не
// отображается ваша клетка - перезагрузите страницу. Если не помогло
// перезагрузите еще раз через 5мин. Если ничего не меняется пишите нам.
// <br />
// * По поводу любых багов пишите на @toncells_technical_support (кнопка
// с вопросиком в сайдбаре)
// <br />
// * Помните, сайт в бета версии!!!
// <br />
// <br />
// <i>P.S. всех обнял, sepezho :)</i>
// </SearchBox>
