import styled from "styled-components";

export const StyledHistory = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  height: 100%;

  @media (max-width: 650px) {
    padding-bottom: 50px;
  }

  h5 {
    font-weight: 600;
    font-size: 1rem;
  }
`;
