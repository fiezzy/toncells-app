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
    <Wrapper>
      <span>XX.09.2022</span>
      <Line />
      <LinksWrapper>
        <a href={tgLink} target="_blank" rel="noreferrer">
          <Icon src={TG_ICON} alt="" />
        </a>
        <a href={getgemsLink} target="_blank" rel="noreferrer">
          <Icon src={GETGEMS_ICON} alt="" />
        </a>
        <a href={twitterLink} target="_blank" rel="noreferrer">
          <Icon src={TWITTER_ICON} alt="" />
        </a>
      </LinksWrapper>
    </Wrapper>
  );
};

export default CenteredBlock;
