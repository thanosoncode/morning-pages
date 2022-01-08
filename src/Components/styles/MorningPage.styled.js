import styled from "styled-components";

export const Container = styled.div`
  width: 580px;
  margin: 70px auto;

  @media (max-width: 500px) {
    width: 90vw;
  }
`;
export const TextArea = styled.textarea`
  width: 100%;
  border: none;
  color: rgb(17, 17, 17);
  font-family: "Lora", serif;
  font-size: 21px;
  line-height: 1.67;
  resize: vertical;
  min-height: 500px;

  &:focus {
    outline: none;
  }
`;
