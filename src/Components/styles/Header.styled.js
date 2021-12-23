import styled from "styled-components";

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 900px;
  margin: 0 auto;
  padding: 15px 30px;
  border-bottom: 1px solid ${({ theme }) => theme.colorVeryLight};

  div:last-child img {
    width: 25px;
    height: 25px;
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

  p:last-child {
    font-weight: normal;
    font-size: 10px;
    color: #8d9da1;
  }
`;
