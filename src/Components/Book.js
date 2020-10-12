import { CheckCircle, MoreVert, PinDropSharp } from "@material-ui/icons";
import {
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Slide,
  TextField,
  Tooltip,
  Zoom,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import ConfirmationDialog from "./ConfirmationDialog";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});
const MoreMenu = ({
  anchorEl,
  setAnchorEl,
  addPage,
  deletePage,
  id,
  setRenameMode,
}) => {
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem
        onClick={(e) => {
          addPage(e);
          handleClose();
        }}
      >
        Add Child
      </MenuItem>
      <MenuItem
        onClick={(e) => {
          setRenameMode(id);
          handleClose();
        }}
      >
        Rename
      </MenuItem>
      <MenuItem
        onClick={(e) => {
          deletePage(e);
          handleClose();
        }}
      >
        Delete
      </MenuItem>
    </Menu>
  );
};

export default function BookCard({
  title: titlep,
  id,
  isPage,
  isHomePage,
  renamePage,
  addPage,
  deletePage,
  renameMode,
  setRenameMode,
  ...rest
}) {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState(titlep);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mount, setMount] = useState(true);
  const [deleteNote, setDeleteNote] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);
  const handleClick = () => {
    if (!isPage) {
      history.push(history.location.pathname + "/" + id);
    } else {
      history.push("/notes/" + id);
    }
  };
  const handleRightClick = (e) => {
    e.preventDefault();
    if (isHomePage) {
      return;
    }
    setAnchorEl(e.currentTarget);
  };
  const handleRename = () => {
    renamePage(id, title);
    setRenameMode(false);
  };
  const handleAddPage = (e) => {
    e.preventDefault();
    setRenameMode(addPage(id, "New page"));
    history.push(history.location.pathname + "/" + id);
  };
  const handleDeletePage = () => {
    // deletePage(id);
    // setMount(false);
    setDeleteNote(true);
  };
  const deleteConfirm = () => {
    setMount(false);
  };
  return (
    <>
      <MoreMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        addPage={handleAddPage}
        deletePage={handleDeletePage}
        setRenameMode={setRenameMode}
        id={id}
      ></MoreMenu>
      <Zoom
        in={mount}
        mountOnEnter
        unmountOnExit
        onExited={() => {
          deletePage(id);
          setMount(true);
        }}
      >
        <Grid item xs={6} md={2} lg={2} xl={1} style={{ position: "relative" }}>
          {!isHomePage ? (
            <Tooltip title="More option">
              <IconButton
                size="small"
                style={{ position: "absolute", right: "6%", zIndex: 11 }}
                onClick={handleRightClick}
              >
                <MoreVert></MoreVert>
              </IconButton>
            </Tooltip>
          ) : null}

          <Card className={classes.root} variant={"outlined"}>
            <CardActionArea
              onClick={handleClick}
              onContextMenu={handleRightClick}
            >
              <CardMedia
                className={classes.media}
                image={
                  isHomePage
                    ? "/icons/book2.svg"
                    : isPage
                    ? "/icons/note.svg"
                    : "/icons/close-book.svg"
                }
                title="Open Pages"
                style={{
                  backgroundSize: "contain",
                  height: "85px",
                  marginTop: "15px",
                }}
              />
              {!renameMode ? (
                <CardContent style={{ textAlign: "center", padding: "10px" }}>
                  <Typography gutterBottom variant="body1" component="h2">
                    {isHomePage ? "Home Page" : titlep}
                  </Typography>
                </CardContent>
              ) : null}
            </CardActionArea>
            {renameMode ? (
              <CardContent>
                <form
                  style={{ position: "relative" }}
                  required
                  autoComplete="off"
                  onSubmit={handleRename}
                >
                  <TextField
                    id="standard-basic"
                    fullWidth
                    defaultValue={titlep}
                    onChange={(e) => {
                      e.stopPropagation();
                      setTitle(e.target.value);
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    selected={true}
                    // focused={true}
                    // onFocus={(e) => {
                    //   e.target.setSelectionRange(0, e.target.value.length);
                    // }}
                  />
                  <IconButton
                    style={{
                      position: "absolute",
                      right: "-16px",
                      top: "-8px",
                    }}
                    onClick={handleRename}
                  >
                    <CheckCircle style={{ color: "lightGreen" }}></CheckCircle>
                  </IconButton>
                </form>
              </CardContent>
            ) : null}
          </Card>
        </Grid>
      </Zoom>
      <ConfirmationDialog
        open={deleteNote}
        setOpen={setDeleteNote}
        confirm={deleteConfirm}
        type="note"
      ></ConfirmationDialog>
    </>
  );
}
