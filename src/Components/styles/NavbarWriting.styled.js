import styled from "styled-components";

export const Container = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colorVeryLight};
`;

export const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1300px;
  margin: 0 auto;
  padding: 10px 40px;
  position: relative;

  h5 {
    font-weight: normal;
    font-size: 1rem;
    color: rgb(141, 157, 161);
  }

  button {
    font-weight: 600;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
  }

  div span:last-child {
    display: none;
  }

  @media (max-width: 500px) {
    padding: 10px 10px;
    div span:first-child {
      display: none;
    }

    div span:last-child {
      display: block;
      font-size: 1.2rem;
    }
  }

  @media (max-width: 400px) {
    padding: 10px 5px;
    h5 {
      font-size: 0.9rem;
    }
  }
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

  @media (max-width: 400px) {
    p {
      margin-left: 1px;
    }
  }
`;

export const GreenButton = styled.button`
  margin-left: 20px;
  color: #2ad287;
  opacity: ${(props) => props.opacity};

  @media (max-width: 500px) {
    margin-left: 10px;
  }
`;

export const ProgressBar = styled.div`
  height: 4px;
  background-color: ${({ theme }) => theme.greenActive};
  position: absolute;
  bottom: -4px;
  left: 0;
  width: ${({ barPercentage }) => {
    if (barPercentage >= 100) {
      return 100;
    } else {
      return barPercentage;
    }
  }}%;
`;
