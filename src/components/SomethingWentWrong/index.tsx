import { VFC } from "react";
import { Wrapper, ErrorWrapper, Title, Description } from "./style";

const SomethingWentWrong: VFC = () => {
  return (
    <Wrapper>
      <ErrorWrapper>
        <Title>Something went wrong...</Title>
        <Description>Technical team workin' on it.</Description>
        <Description>Please, come back later.</Description>
      </ErrorWrapper>
    </Wrapper>
  );
};

export default SomethingWentWrong;
