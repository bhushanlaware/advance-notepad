import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  root: {
    position: "fixed",
    height: "100%",
    width: "100%",
    margin: 0,
    top: "0",
    left: 0,
    backgroundColor: theme.palette.background.default,
    zIndex: 1111,
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
}));
const FullPageLoader = (props) => {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <CircularProgress
        className={classes.loader}
        size="4rem"
        {...props}
      ></CircularProgress>
    </div>
  );
};

export default FullPageLoader;
