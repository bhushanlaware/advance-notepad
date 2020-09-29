import AppBar from "../Components/AppBar";
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
}));

const Home = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar title={"My App"} {...props}></AppBar>

      <Footer></Footer>
    </div>
  );
};

export default Home;
