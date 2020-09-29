import { makeStyles, withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import GitHubIcon from "@material-ui/icons/GitHub";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const useStyle = makeStyles((theme) => ({
  socialIcon: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("md")]: {
      textAlign: "left",
    },
  },
  supportBtn: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("md")]: {
      textAlign: "right",
    },
  },
}));
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyle();
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        <h1 style={{ fontSize: "1.2rem" }}>Offline Image Compressor </h1>
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          <h2 style={{ fontSize: "1rem", fontWeight: "400" }}>
            The image compressor app can help you compress, crop or resize
            images in bulk and offline
            <span role="img" aria-label="reduce image size in kb">
              🔥
            </span>
            and download them as individuals images or as a ZIP. You can also
            create a PDF on the way. You can check advance settings to compress
            and resize images as you like.
          </h2>
        </Typography>
        <Typography gutterBottom>
          <h2 style={{ fontSize: "1rem", fontWeight: "400" }}>
            The best thing about this app is that never uploads images to the
            server. It is a progressive web app that will compress images in the
            browser using javascript. Hence it is fast
            <span role="img" aria-label="Bulk photo compression">
              ⚡
            </span>
            , reliable, and secure. It works offline and can be installed in
            android, mac, iOS, Windows, or any platform that supports modern
            browsers{" "}
            <span role="img" aria-label="fast and secure">
              💪
            </span>
            .
          </h2>
        </Typography>
        <Typography gutterBottom>
          If you like this application you can check the source code at Github
          and also follow me on Instagram and Linkedin for such amazing apps{" "}
          <span role="img" aria-label="resize image to 100kb">
            💖
          </span>
          .
        </Typography>
      </DialogContent>
      <DialogActions>
        <Grid container>
          <Grid item className={classes.socialIcon} md={6} xs={12}>
            <IconButton href="https://github.com/bhushanlaware">
              <GitHubIcon size="small"></GitHubIcon>
            </IconButton>
            <IconButton href="https://www.linkedin.com/in/bhushanlaware/">
              <LinkedInIcon></LinkedInIcon>
            </IconButton>
            <IconButton href="https://www.instagram.com/bhushanlaware">
              <InstagramIcon></InstagramIcon>
            </IconButton>
          </Grid>
          <Grid item className={classes.supportBtn} md={6} xs={12}>
            <Button
              autoFocus
              onClick={handleClose}
              color="primary"
              id="container"
            >
              🥂 Want to Support Me?
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
