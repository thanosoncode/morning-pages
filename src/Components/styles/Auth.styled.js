import styled from "styled-components";

export const StyledForm = styled.form`
  width: 360px;
  margin: 100px auto;
  h1 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 50px;
  }

  div {
    margin-top: 15px;
  }
  label {
    font-size: 12px;
    font-weight: 500;
    margin-bottom: 5px;
  }
  input {
    width: 100%;
    background-color: #f2f6f7;
    border-radius: 3px;
    border: 1px solid #dae9ef;
    color: #212b36;
    font-size: 1rem;
    line-height: 1;
    padding: 0.75rem 1rem;
    margin-top: 5px;
  }

  p {
    color: #ff5e3c;
    font-size: 14px;
    font-weight: 500;
    margin-top: 5px;
    margin-bottom: 5px;
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

  footer {
    text-align: center;
    margin-top: 20px;
  }

  span {
    font-weight: 500;
  }

  span:last-child {
    color: ${({ theme }) => theme.color};
    margin-left: 10px;
    cursor: pointer;
  }
  span:last-child:hover {
    color: ${({ theme }) => theme.colorDark};
  }
`;
