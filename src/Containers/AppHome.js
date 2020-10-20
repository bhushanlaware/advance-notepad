import { Box, Button, Divider, Grid, Typography } from "@material-ui/core";

import AppCard from "../Components/AppCard";
import { Apps } from "@material-ui/icons";
import React from "react";

const appList = [
  { title: "Todo", image: "/icons/mstodo.svg", path: "/todo" },
  {
    title: "File Comparer",
    image: "/icons/filecompare-app.svg",
    path: "/filecompare",
  },
  { title: "Json Viewer", image: "/icons/code.svg", path: "/jsonviewer" },
  { title: "Notes", image: "/icons/notebook-app.svg", path: "/notes/files" },
];
const AppHome = (props) => {
  return (
    <Box p={4}>
      <Box pb={1}>
        <Typography variant={"body1"} color="textSecondary">
          <Apps style={{ float: "left" }} color="primary" />
          Apps
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
