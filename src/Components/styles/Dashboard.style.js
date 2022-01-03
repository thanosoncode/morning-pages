import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  padding: 40px 60px 60px 60px;
  place-items: start center;
  grid-template-columns: 1fr 1px 1fr;
  /* gap: 50px; */

  @media (max-width: 850px) {
    padding: 60px 20px;
  }
  @media (max-width: 650px) {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 60px 5px;
  }
`;

export const Line = styled.div`
  background: ${({ theme }) => theme.colorVeryLight};
  width: 1px;
  height: 100%;
`;
