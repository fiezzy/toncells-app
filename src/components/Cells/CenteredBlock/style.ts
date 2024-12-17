import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  top: 850px;
  left: 860px;
  transform: translate(-50%, -50%);
  z-index: 100;
  color: white;
  user-select: none;
  backdrop-filter: blur(6px);
  padding: 25px 70px 25px 70px;
  border-radius: 40px;

  span {
    /* font-family: "Roboto", sans-serif !important; */
    font-size: 50px;
    /* font-weight: 900; */
    /* -webkit-text-stroke: 0.7px rgba(0, 0, 0, 0.3); */
  }
`;

export const Line = styled.div`
  height: 2px;
  width: 90%;
  margin: 10px auto;
  background-color: #fff;
`;

export const LinksWrapper = styled.div`
  display: flex;
  /* align-items: center; */
  /* justify-content: center; */
  margin: 8px auto 0 auto;
  gap: 96px;
  /* position: absolute; */
  /* left: 15px; */

  a {
    img {
      width: 50px;
      height: 50px;
    }
  }
`;

export const LinkBlock = styled.div`
  displat: flex;
  padding: 5px 15px;
  flex-direction: column;
  gap: 10px;
  background-color: #fff;
  border: 2px solid #fff;
  border-radius: 15px;
  height: 110px;
  width: 92px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.6;
  }
`;

export const LinkLabel = styled.p`
  position: absolute;
  margin: 0;
  color: #000;
  font-weight: 900;
  //   margin-top: auto;
  bottom: 30px;
  text-align: center;
`;

export const Icon = styled.img`
  width: 80px;
  height: 80px;
  transition: 0.3s;

  &:hover {
    opacity: 0.6;
  }

  svg {
    fill: #ffffff;
  }
`;
