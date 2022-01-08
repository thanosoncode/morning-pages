import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 370px;

  @media (max-width: 650px) {
    width: 360px;
  }
`;

export const Navigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;

  button {
    background: none;
    border: 1px solid ${({ theme }) => theme.colorVeryLight};
    border-radius: 50%;
    padding: 3px;
    cursor: pointer;
    display: inline-block;
    transition: 0.3s ease;
  }

  button:hover {
    border: 1px solid black;
  }

  button span {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  select {
    width: 120px;
    border: 1px solid ${({ theme }) => theme.colorVeryLight};
    padding: 0.2rem;
    border-radius: 3px;
    font-weight: 500;
    font-size: 1rem;
    transition: 0.3s ease;
    background-color: white;
  }

  select:hover {
    width: 120px;
    border: 1px solid black;
    padding: 0.2rem;
    border-radius: 3px;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  grid-gap: 10px;
  place-items: center;
`;

export const DayNames = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Day = styled.div`
  border: 1px solid ${({ theme }) => theme.colorVeryLight};
  border-radius: 5px;
  background-color: ${({ bg }) => bg};
  color: ${({ color }) => color};
  cursor: pointer;
  transition: 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(1.1);
  }
`;

export const Footer = styled.div`
  width: 100%;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  border: 1px solid ${({ theme }) => theme.colorVeryLight};
  padding: 20px;
  margin-top: 30px;

  button {
    border-radius: 999px;
    padding: 12px 24px;
    font-size: 1rem;
    font-weight: 500;
    color: white;
    border: none;
    transition: 0.3s ease;
    background-color: ${({ theme }) => theme.color};
    cursor: pointer;
    width: 50%;
    max-height: 50px;
  }
  button:hover {
    background-color: ${({ theme }) => theme.colorDark};
  }

  p {
    width: 50%;
  }
`;
