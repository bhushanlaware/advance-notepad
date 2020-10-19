import "./App.css";

import * as serviceWorker from "./serviceWorker";

import React, { useEffect, useState } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import BluePink from "./Themes/BluePink";
import { CssBaseline } from "@material-ui/core";
import MyApp from "./Containers/MyApp";
import { useSnackbar } from "notistack";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: darkMode ? "dark" : "light",
          ...BluePink,
        },
      }),
    [darkMode]
  );
  useEffect(() => {
    serviceWorker.register({
      onUpdate: (registration) => {
        enqueueSnackbar("Newer version detected. Updating to new version. 🚀", {
          variant: "success",
        });
        registration.unregister().then(() => {
          window.location.reload();
        });
      },
    });
  }, []);

  useEffect(() => {
    let dmode = localStorage.getItem("darkMode");
    dmode === "false" ? setDarkMode(false) : setDarkMode(true);
  }, []);

  const changeTheme = () => {
    console.log("Changing theme");
    localStorage.setItem("darkMode", !darkMode);
    setDarkMode(!darkMode);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MyApp changeTheme={changeTheme} isDark={darkMode}></MyApp>
    </ThemeProvider>
  );
}

export default App;
