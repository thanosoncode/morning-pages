import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  padding: 60px;
  place-items: center;
  grid-template-columns: 1fr 1fr;
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
