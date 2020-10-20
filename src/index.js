import "./index.css";

import App from "./App";
import Home from "./Containers/Home";
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
