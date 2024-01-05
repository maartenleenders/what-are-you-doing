import * as ReactDOM from "react-dom";
import App from "./app";
import React from "react";
import { LogEntriesContextProvider } from "../../shared/context/log-entries.context";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../shared/theme/theme";

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LogEntriesContextProvider>
          <App />
        </LogEntriesContextProvider>
      </ThemeProvider>
    </React.StrictMode>,

    document.body,
  );
}

render();
