import {
  Add as AddIcon,
  ArrowBackOutlined,
  GetApp,
  ImportExport,
  Publish,
} from "@material-ui/icons";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";

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
  {
    icon: <AddIcon />,
    name: "Add Note",
    onClick: (props, parentId, setRenameMode) => {
      setRenameMode(props.onAddPage(parentId, "New Page"));
    },
  },
  {
    icon: <GetApp />,
    name: "Export Notes",
    onClick: (props) => {
      props.export();
    },
  },
  {
    icon: <Publish />,
    name: "Import Notes",
    onClick: (props) => {
      props.import();
    },
  },
  // { icon: <ShareIcon />, name: "Share" },
  // { icon: <FavoriteIcon />, name: "Like" },
];

const Library = (props) => {
  const classes = useStyles();
  const { notes } = props;
  const [showNotes, setShowNotes] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [renameMode, setRenameMode] = React.useState(false);
  const path = props.match.url;
  let location = path.split("files/")[1];
  if (location) location = location.split("/");
  let current = location ? location.pop() : "Main";
  if (current === "home") {
    current = "Main";
  }
  let fileRef = useRef(null);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    let mainNotes = notes.filter((x) => x.parent === current);
    if (current !== "Main") {
      mainNotes = [
        {
          title: "Home Page",
          childs: 0,
          id: current,
          isHomepage: true,
          notes: notes.filter((x) => x.id === current)[0]?.notes || "",
        },
        ...mainNotes,
      ];
    }
    setShowNotes(mainNotes);
  }, [current, notes]);

  return (
    <Container>
      <Box p={3}>
        <Breadcrumb {...props}></Breadcrumb>
        <Box pt={3}>
          <Grid container spacing={3}>
            {showNotes.map((x) => (
              <Book
                title={x.title}
                id={x.id}
                isPage={x.childs === 0}
                isHomePage={x.isHomepage}
                renameMode={x.id === renameMode}
                renamePage={props.onRename}
                setRenameMode={setRenameMode}
                deletePage={props.onDeletePage}
                addPage={props.onAddPage}
              />
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
              onClick={() =>
                action.onClick(props, current, setRenameMode, fileRef)
              }
            />
          ))}
        </SpeedDial>
      </Box>
    </Container>
  );
};

export default Library;
