import { Box, IconButton, TextField, Zoom } from "@material-ui/core";
import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import { CancelRounded } from "@material-ui/icons";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CheckCircle from "@material-ui/icons/CheckCircleOutlineOutlined";
import Todo from "./Todo";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  list: {},
  closeBtn: {
    position: "absolute",
    right: "-17px",
    top: "-17px",
  },
}));

export default function TodoCard(props) {
  const classes = useStyles();
  const [editTitle, setEditTitle] = useState(false);
  const [mounted, setMounted] = useState(true);
  const { title, setTitle, id } = props;

  let clearAll = () => {};
  let clearCompleted = () => {};
  return (
    <Card className={classes.root}>
      <CardContent>
        {!editTitle ? (
          <Box style={{ position: "relative" }}>
            <Button
              onClick={() => {
                setEditTitle(true);
              }}
            >
              <Typography gutterBottom variant="h6" component="h6">
                {title}
              </Typography>
            </Button>
            <IconButton
              className={classes.closeBtn}
              onClick={() => {
                props.removeCard(id);
              }}
            >
              <CancelRounded></CancelRounded>
            </IconButton>
          </Box>
        ) : (
          <form
            style={{ position: "relative" }}
            required
            autoComplete="off"
            onSubmit={() => {
              setEditTitle(false);
            }}
          >
            <TextField
              id="standard-basic"
              name="title"
              fullWidth
              value={title}
              onChange={(e) => {
                setTitle(e.target.value, id);
              }}
            />
            <IconButton
              style={{
                position: "absolute",
                right: 0,
                top: "-13px",
              }}
              onClick={() => {
                setEditTitle(false);
              }}
            >
              <CheckCircle style={{ color: "lightGreen" }}></CheckCircle>
            </IconButton>
          </form>
        )}

        <Todo
          id={id}
          setClearAll={(click) => (clearAll = click)}
          setClearCompleted={(click) => (clearCompleted = click)}
        ></Todo>
      </CardContent>
      <CardActions style={{ float: "right" }}>
        <Button
          size="small"
          color="secondary"
          variant="outlined"
          onClick={() => clearCompleted()}
        >
          Clear Completed
        </Button>
        {/* <Button size="small" color="secondary" onClick={() => clearAll()}>
          Clear All
        </Button> */}
      </CardActions>
    </Card>
  );
}
