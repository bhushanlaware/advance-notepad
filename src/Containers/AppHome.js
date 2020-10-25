import { Box, Button, Divider, Grid, Typography } from "@material-ui/core";

import AppCard from "../Components/AppCard";
import { Apps } from "@material-ui/icons";
import React from "react";
import TodoIcon from "../icons/mstodo.svg";
import CodeIcon from "../icons/code.svg";
import NoteBookIcon from "../icons/notebook-app.svg";
import ImageApp from "../icons/imageapp.svg";
import FileCompareIcon from "../icons/filecompare-app.svg";
const appList = [
  { title: "Todo", image: TodoIcon, path: "/todo" },
  {
    title: "File Comparer",
    image: FileCompareIcon,
    path: "/filecompare",
  },
  { title: "Json Viewer", image: CodeIcon, path: "/jsonviewer" },
  { title: "Notes", image: NoteBookIcon, path: "/notes/files" },
  {
    title: "Image Compressor",
    image: ImageApp,
    path: "https://compressimage.app",
  },
];
const AppHome = (props) => {
  return (
    <Box p={4}>
      <Box pb={1}>
        <Typography variant={"body1"} color="textSecondary">
          <Apps style={{ float: "left" }} color="primary" /> &nbsp; Apps
        </Typography>
      </Box>
      <Divider />
      <br />
      <Grid container spacing={3}>
        {appList.map((x) => (
          <AppCard {...x} />
        ))}
      </Grid>
    </Box>
  );
};

export default AppHome;
