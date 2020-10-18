import "./index.css";

import App from "./App";
import FileComparer from "./Containers/FileComparer";
import React from "react";
import ReactDOM from "react-dom";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <App />
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
