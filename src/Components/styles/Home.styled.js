import styled from "styled-components";
import bg from "../../images/morning-pages-bg.jpg";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(${bg});
  background-size: cover;
  position: relative;
  z-index: 0;
  overflow: hidden;
`;

export const StyledLogoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  img {
    width: 40px;
    height: 40px;
  }

  p {
    margin-left: 10px;
    font-weight: 600;
  }

  p:last-child {
    font-weight: normal;
    font-size: 10px;
    color: #8d9da1;
  }
`;

export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 900px;
  margin: 0 auto;
  padding: 15px 30px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100% - 90px);
  text-align: center;

  h1 {
    font-size: 48px;
    margin: 20px 0px;
    font-weight: 700;
    line-height: 1.5;
    color: rgb(29, 33, 41);
  }

  h3 {
    line-height: 1.25;
    letter-spacing: 0.6px;
    color: rgb(29, 33, 41);
    font-size: 24px;
    font-weight: 400;
    margin: 10px 0px;
  }

  button {
    border-radius: 10.5px;
    background-image: radial-gradient(
      circle at 0px 0px,
      rgb(75, 99, 227),
      rgb(8, 155, 222) 40%,
      rgb(0, 162, 221) 100%,
      rgb(93, 211, 158)
    );
    font-size: 18px;
    font-weight: 500;
    color: white;
    cursor: pointer;
    height: 52px;
    border: 1px solid transparent;
    transition: all 0.1s ease 0s;
    width: 260px;
    margin-top: 10px;
  }

  button:hover {
    background: transparent;
    border: 1px solid black;
    color: black;
  }

  @media (max-width: 500px) {
    justify-content: flex-start;
    padding-top: 150px;

    h1 {
      margin: 20px 0px 40px 0;
      font-size: 44px;
      padding: 0 20px;
    }

    h3 {
      font-size: 20px;
      padding: 0px 25px;
      margin-bottom: 40px;
    }

    button {
      font-size: 1.4rem;
    }
  }
`;
