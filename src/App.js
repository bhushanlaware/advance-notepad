import "./App.css";

import * as serviceWorker from "./serviceWorker";

import { Button, CssBaseline } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import BluePink from "./Themes/BluePink";
import MyApp from "./Containers/MyApp";
import { useSnackbar } from "notistack";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [newVersionAvailable, setNewVersionAvailable] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState({});
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

  const onServiceWorkerUpdate = (registration) => {
    console.log("onServiceWorkerUpdate");
    setNewVersionAvailable(true);
    setWaitingWorker(registration && registration.waiting);
    if (newVersionAvailable)
      //show snackbar with refresh button
      enqueueSnackbar("A new version is avaible", {
        persist: true,
        variant: "success",
        action: refreshAction(),
      });
  };

  const updateServiceWorker = () => {
    console.log("updateServiceWorker");
    waitingWorker && waitingWorker.postMessage({ type: "SKIP_WAITING" });
    setNewVersionAvailable(false);
    window.location.reload();
  };

  const refreshAction = (key) => {
    //render the snackbar button
    return (
      <Fragment>
        <Button
          className="snackbar-button"
          size="small"
          onClick={updateServiceWorker}
        >
          {"refresh"}
        </Button>
      </Fragment>
    );
  };
  useEffect(() => {
    console.log("Regstering..");
    serviceWorker.register({ onUpdate: onServiceWorkerUpdate });
  }, []);

  useEffect(() => {
    let dmode = localStorage.getItem("darkMode");

    // if (dmode == undefined) {
    //   dmode = false;
    //   localStorage.setItem("darkMode", dmode);
    // }
    dmode === "false" ? setDarkMode(false) : setDarkMode(true);
  }, []);

  // useEffect(() => {
  //   window["isUpdateAvailable"].then((isAvailable) => {
  //     if (isAvailable) {
  //       window.location.href = "/";
  //     }
  //   });
  // }, []);
  const changeTheme = () => {
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
