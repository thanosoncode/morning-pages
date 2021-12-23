import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GlobalStyles } from "./Components/styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { AppContextProvider } from "./Components/Context";
import Test from "./Test";

const theme = {
  color: "#00A2DD",
  colorDark: "#0082b1",
  colorLight: "#33b5e4",
  colorVeryLight: "rgb(218, 233, 239)",
  greenActive: "#2ad287",
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </ThemeProvider>
    {/* <Test /> */}
  </React.StrictMode>,
  document.getElementById("root")
);
