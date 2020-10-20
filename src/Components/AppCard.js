import { CardActionArea, CardMedia, Grid, Zoom } from "@material-ui/core";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

export default function AppCard({ image, title, path }) {
  const history = useHistory();
  return (
    <Zoom in={true} mountOnEnter unmountOnExit>
      <Grid item xs={12} sm={6} md={3} lg={3} xl={2}>
        <Card elevation={0}>
          <CardActionArea
            onClick={(e) => {
              history.push(path);
            }}
          >
            <CardMedia
              image={image}
              title={title}
              style={{
                backgroundSize: "contain",
                height: "85px",
                marginTop: "15px",
              }}
            ></CardMedia>
            <CardContent style={{ textAlign: "center" }}>
              <Typography variant="h6">{title}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Zoom>
  );
}
