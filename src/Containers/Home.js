import AppBar from "../Components/AppBar";
import Editor from "./Editor";
import Footer from "../Components/Footer";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
  },
}));

const Home = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar title={"My App"} {...props}></AppBar>
      <Footer className={classes.footer}></Footer>
    </div>
  );
};

export default Home;
