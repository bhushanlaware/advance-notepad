import { Book, NoteOutlined } from "@material-ui/icons";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    color: theme.palette.text.secondary,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  link1: {
    display: "flex",
    color: theme.palette.text.primary,
    textDecoration: "none",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

export default function IconBreadcrumbs(props) {
  const classes = useStyles();
  const path = props.match.url;
  let location = path.split("files/")[1];
  if (location) location = location.split("/");
  const current = location ? location.pop() : "home";
  let addpath = "";

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" to="/notes/files" className={classes.link}>
        <HomeIcon className={classes.icon} />
        Home
      </Link>
      {(addpath = "")}
      {current !== "home"
        ? location.map((x) => {
            addpath += "/" + x;
            return (
              <Link
                color="white"
                to={"/notes/files" + addpath}
                className={classes.link}
              >
                <Book className={classes.icon} />
                {props.notes.filter((y) => y.id === x)[0]?.title || x}
              </Link>
            );
          })
        : null}

      {current !== "home" ? (
        <Typography color="primary" className={classes.link1}>
          <NoteOutlined className={classes.icon} />
          {props.notes.filter((y) => y.id === current)[0]?.title || current}
        </Typography>
      ) : null}
    </Breadcrumbs>
  );
}
