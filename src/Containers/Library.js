import {
  Add as AddIcon,
  ArrowBackOutlined,
  ImportExport,
} from "@material-ui/icons";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import Book from "../Components/Book";
import Breadcrumb from "../Components/Breadcrumb";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
}));
const actions = [
  { icon: <AddIcon />, name: "Add Note" },
  { icon: <ImportExport />, name: "Export Notes" },
  { icon: <ArrowBackOutlined />, name: "Import Notes" },
  { icon: <ShareIcon />, name: "Share" },
  { icon: <FavoriteIcon />, name: "Like" },
];

const Library = (props) => {
  const classes = useStyles();
  const { notes } = props;
  const [showNotes, setShowNotes] = useState([]);
  const [open, setOpen] = React.useState(false);

  const path = props.match.url;
  let location = path.split("files/")[1];
  if (location) location = location.split("/");
  let current = location ? location.pop() : "Main";
  if (current === "home") {
    current = "Main";
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    const mainNotes = notes.filter((x) => x.parent === current);
    setShowNotes(mainNotes);
  }, [current, notes]);
  const handleExpansion = (id) => {
    const index = notes.findIndex((x) => x.id === id);
    const newShowNotes = [
      ...showNotes,
      { ...notes[index], childs: 0, parent: id },
      ...notes.filter((x) => x.parent === id),
    ];
    // const newShowNotes = [...notes];
    // newShowNotes.splice(
    //   index + 1,
    //   0,
    //   { ...notes[index], childs: 0, parent: id },
    //   ...notes.filter((x) => x.parent === id)
    // );
    setShowNotes(newShowNotes);
  };

  const handleCollapse = (id) => {
    const allChilds = getAllChilds(id, showNotes); //[...showNotes.filter((x) => x.parent !== id)];
    const newShowNotes = showNotes.filter(
      (x) =>
        allChilds.filter((y) => y.id === x.id).length === 0 && x.parent !== id
    );

    setShowNotes(newShowNotes);
  };
  const getAllChilds = (id, list) => {
    let currentChilds = list.filter(
      (x) => x.parent === id && x.parent !== x.id
    );
    if (currentChilds.length === 0) return [];
    currentChilds.forEach((x) => {
      let childsChilds = getAllChilds(x.id, list);
      currentChilds = [...currentChilds, ...childsChilds];
    });
    return currentChilds;
  };
  return (
    <Container>
      <Box p={3}>
        <Breadcrumb {...props}></Breadcrumb>
        <Box pt={3}>
          <Grid container spacing={3}>
            {showNotes.map((x) => (
              <Grid item xs={6} md={2} lg={2} xl={1}>
                <Book
                  title={x.title}
                  expand={handleExpansion}
                  collapse={handleCollapse}
                  id={x.id}
                  isPage={x.childs === 0}
                />
              </Grid>
            ))}
          </Grid>
        </Box>{" "}
        <SpeedDial
          ariaLabel="More"
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction="up"
          color="secondary"
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={handleClose}
            />
          ))}
        </SpeedDial>
      </Box>
    </Container>
  );
};

export default Library;
