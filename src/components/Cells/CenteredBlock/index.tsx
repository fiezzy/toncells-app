import { VFC } from "react";
import { TG_ICON, TWITTER_ICON, GETGEMS_ICON } from "../../../constants/images";
import {
	Wrapper,
	Line,
	LinksWrapper,
	LinkBlock,
	LinkLabel,
	Icon,
} from "./style";

const tgLink = "https://t.me/toncells";
const twitterLink = "https://twitter.com/toncells";
const getgemsLink =
	"https://getgems.io/collection/EQD_uR9wEQcZ9nA6-EMSlLSeG5eKpJOQvjQIcqPJ5DqFmKX4";

const CenteredBlock: VFC = () => {
	return (
<Wrapper style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
  <span style={{
    fontFamily: `'Roboto', sans-serif`,
    fontWeight: 'bold',
    fontSize: '50px', // Устанавливаем размер текста
    lineHeight: '1',
    width: 'fit-content' // Подгоняет ширину под контент
  }}>
    this is toncells v1
  </span>
  <br />
  <span style={{
    fontFamily: `'Roboto', sans-serif`,
    fontWeight: 'bold',
    fontSize: '40px', // Совпадает с первым текстом
    lineHeight: '1',
    width: 'fit-content', // Подгоняет ширину под контент
  }}>
    new version is <a href={'https://app.toncells.org'} style={{textDecoration: "underline" }}>here</a>
  </span>
  <br />
  <span style={{
    fontFamily: `'Roboto', sans-serif`,
    fontWeight: 'bold',
    fontSize: '30px', // Совпадает с первым текстом
    lineHeight: '1',
    width: 'fit-content', // Подгоняет ширину под контент
  }}>
    more <a href={'https://toncells.org'} style={{textDecoration: "underline" }}>info</a>
  </span>
		</Wrapper>
	);
};

export default CenteredBlock;
