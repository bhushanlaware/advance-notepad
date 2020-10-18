import React, { Component, Fragment } from "react";

import { Button } from "@material-ui/core";
import { Workbox } from "workbox-window";

class App2 extends Component {
  state = {};

  componentDidMount = () => {
    const { enqueueSnackbar } = this.props;

    if ("serviceWorker" in navigator) {
      const wb = new Workbox("/sw.js");

      wb.addEventListener("waiting", (event) => {
        const onButtonClick = async () => {
          wb.addEventListener("controlling", (event) => {
            window.location.reload(true);
          });
          wb.messageSW({ type: "SKIP_WAITING" });
        };

        enqueueSnackbar({
          message: "New version is avialble",
          action: (
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={onButtonClick}
            >
              Refresh
            </Button>
          ),
        });
      });
    }
  };
  refreshAction = (key) => {
    //render the snackbar button
    return (
      <Fragment>
        <Button
          className="snackbar-button"
          size="small"
          onClick={this.updateServiceWorker}
        >
          {"refresh"}
        </Button>
      </Fragment>
    );
  };

  render() {
    return <h1>v2</h1>;
  }
}

export default App2;
