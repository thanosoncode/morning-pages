import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *{
    padding:0;
    margin:0;
    box-sizing:border-box;
}

  body {
    font-family:"Open sans",sans-serif;
  }

  a {
    text-decoration:none;
  }

  ul{
    list-style:none;
  }
`;
