import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GlobalStyles } from "./Components/styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { AppContextProvider } from "./context";
import { theme } from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
