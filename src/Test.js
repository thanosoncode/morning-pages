import styled from "styled-components";
import test from "./images/test.png";

const Container = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  border: 1px solid black;
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${test});
  background-size: 50%;
  background-position: bottom;

  /* div {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background-color: red;
    z-index: -5;
    mix-blend-mode: difference;
  } */
`;

const Test = () => {
  return (
    <Container>
      15
      <div></div>
    </Container>
  );
};

export default Test;
