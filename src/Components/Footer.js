import { Grid, IconButton } from "@material-ui/core";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
function Support() {
  return (
    <Typography variant="subtitle2">
      Created with
      <span role="img" aria-label="heart-emoji">
        ❤️
      </span>
      Consider following me on
      <IconButton
        size="small"
        _target="_blank"
        href="https://www.linkedin.com/in/bhushanlaware/"
      >
        <LinkedInIcon style={{ color: "#2880c9" }}></LinkedInIcon>
      </IconButton>
      if truly enjoying
      <span role="img" aria-label="heart-emoji">
        &nbsp;Image Compressor App 🚀
      </span>
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
  center: {
    textAlign: "center",
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container>
        <Grid container>
          <Grid item xs={12} className={classes.center}>
            <Support />
          </Grid>
          <Grid item xs={12} className={classes.center}>
            <Copyright />
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}
