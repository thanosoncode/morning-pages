import styled from "styled-components";

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 900px;
  margin: 0 auto;
  padding: 15px 30px;
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
`;

export const GreenButton = styled.button`
  margin-left: 20px;
  color: #2ad287;
  opacity: ${(props) => props.opacity};
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
