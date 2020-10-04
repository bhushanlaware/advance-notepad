import { Slide, Tooltip, useScrollTrigger } from "@material-ui/core";

import AppBar from "@material-ui/core/AppBar";
import DarkIcon from "@material-ui/icons/Brightness4";
import DialogModal from "./DialogModal";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import InstallPWA from "./InstallPWA";
import LightIcon from "@material-ui/icons/Brightness7";
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logoimg: {
    // backgroundColor: theme.palette.background.default,
    // borderRadius:'1'
  },
  AppBar: {
    background: theme.palette.background.default,
  },
}));
function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
export default function ButtonAppBar(props) {
  const classes = useStyles();
  const [openInfo, setOpenInfo] = React.useState(false);

  const handleClickOpen = () => {
    setOpenInfo(true);
  };
  return (
    <div className={classes.root}>
      <HideOnScroll>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <img
                src="./android-chrome-512x512.png"
                alt="logo"
                height="38"
                className={classes.logoimg}
              ></img>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {props.title}
            </Typography>

            <Tooltip title="Change Theme">
              <IconButton color="inherit" onClick={props.changeTheme}>
                {!props.isDark ? (
                  <DarkIcon></DarkIcon>
                ) : (
                  <LightIcon></LightIcon>
                )}
              </IconButton>
            </Tooltip>

            <InstallPWA></InstallPWA>
            <Tooltip title="About">
              <IconButton color="inherit" onClick={handleClickOpen}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <DialogModal open={openInfo} setOpen={setOpenInfo}></DialogModal>
    </div>
  );
}
