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

export const Section = styled.section`
  border-bottom: 1px solid ${({ theme }) => theme.colorVeryLight};
  margin-bottom: 20px;
`;

export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  p:first-child {
    font-weight: 500;
  }

  p:last-child {
    color: #8d9da1;
    max-width: 320px;
  }

  @media (max-width: 500px) {
    max-width: none;
  }
`;

export const Button = styled.button`
  border-radius: 999px;
  background: none;
  border: 1px solid ${({ color }) => color};
  color: ${({ color }) => color};
  padding: 12px 24px;
  transition: 0.3s ease;
  font-weight: 600;

  &:hover {
    background-color: #eee;
  }

  @media (max-width: 500px) {
    padding: 5px 14px;
    font-size: 1rem;
    margin-left: 20px;
  }
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: ${({ display }) => display};
  justify-content: center;
  align-items: center;
  background-color: rgba(20, 20, 20, 0.7);
`;

export const Modal = styled.div`
  position: relative;
  padding: 50px 60px;
  background-color: white;
  box-shadow: 0 3px 20px 0 rgb(0 0 0 / 16%);
  border-radius: 10px;
  max-width: 500px;
  background-color: white;

  h3 {
    font-weight: 700;
    font-size: 21px;
    margin-bottom: 2rem;
  }

  label {
    font-size: 0.9rem;
  }

  input {
    margin-top: 5px;
    width: 100%;
    background-color: #f2f6f7;
    border-radius: 3px;
    border: 1px solid #dae9ef;
    color: #212b36;
    font-size: 1rem;
    line-height: 1;
    padding: 0.75rem 1rem;
  }

  input:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.color};
  }
  button {
    width: 100%;
    background-color: ${({ theme }) => theme.color};
    border-radius: 999px;
    padding: 12px 24px;
    cursor: pointer;
    border: none;
    transition: 0.3s ease;
    margin-top: 30px;
    font-size: 1rem;
    color: white;
  }

  button:hover {
    background-color: ${({ theme }) => theme.colorDark};
  }

  span {
    position: absolute;
    top: 30px;
    right: 30px;
    font-size: 1.5rem;
    cursor: pointer;
  }
`;
