import styled from "styled-components";

export const Container = styled.div`
  max-width: 540px;
  margin: 20px auto;

  h1 {
    font-weight: 500;
    font-size: 24px;
    margin-bottom: 40px;
  }

  @media (max-width: 500px) {
    padding: 10px;
  }
`;

export const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;

  article {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  section {
    width: 90px;
    height: 90px;
    border: 1px solid #dce6ea;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    transition: 0.3s ease;
    padding: 0;
  }

  section:hover {
    border: 1px solid ${({ theme }) => theme.colorLight};
  }

  h5 {
    font-size: 0.9rem;
    font-weight: 600;
    text-align: center;
  }

  @media (max-width: 500px) {
    grid-gap: 10px;
    grid-row-gap: 30px;
  }

  @media (max-width: 400px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const StyledImg = styled.img`
  width: 60px;
  height: 60px;
  filter: ${({ filter }) => filter};
`;

export const Bubble = styled.div`
  position: absolute;

  display: ${({ display }) => display};
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  border: 1px solid ${({ theme }) => theme.colorVeryLight};
  background-color: white;
  padding: 5px 15px;

  div {
    position: absolute;
    width: 14px;
    height: 14px;
    bottom: -7px;
    left: calc(50% - 7px);
    background-color: white;
    transform: rotate(45deg);
    border-right: 1px solid ${({ theme }) => theme.colorVeryLight};
    border-bottom: 1px solid ${({ theme }) => theme.colorVeryLight};
  }
`;
