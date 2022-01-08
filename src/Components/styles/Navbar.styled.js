import styled from "styled-components";

export const Container = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colorVeryLight};
  position: relative;
`;

export const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1300px;
  margin: 0 auto;
  padding: 10px 40px;

  div:last-child img {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }

  @media (max-width: 500px) {
    padding: 10px;
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

  @media (max-width: 500px) {
    div {
      display: none;
    }
  }
`;

export const Links = styled.div`
  display: flex;
  gap: 15px;

  img {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }

  @media (max-width: 500px) {
    img {
      margin-left: 15px;
    }
  }
`;
