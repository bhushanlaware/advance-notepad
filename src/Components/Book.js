import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Slide } from "@material-ui/core";
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

export default function BookCard({
  title,
  expand,
  collapse,
  id,
  isPage,
  ...rest
}) {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState(false);
  const history = useHistory();
  const handleClick = () => {
    if (!isPage) {
      if (isExpanded) {
        collapse(id);
      } else {
        expand(id);
      }
      setIsExpanded(!isExpanded);
    } else {
      history.push("/notes/" + id);
    }
  };
  return (
    <Slide direction="right" in={true} timeout={600} mountOnEnter>
      <Card className={classes.root} variant={"outlined"}>
        <CardActionArea onClick={handleClick}>
          <CardMedia
            className={classes.media}
            image={
              isExpanded
                ? "/icons/open-book.svg"
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
          <CardContent style={{ textAlign: "center", padding: "10px" }}>
            <Typography gutterBottom variant="body1" component="h2">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
        {/* <CardActions>
        <Button size="small" color="primary">
          View Pages
        </Button>
      </CardActions> */}
      </Card>
    </Slide>
  );
}
