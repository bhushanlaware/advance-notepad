import { Box, Divider, Slide, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import DeleteIcon from "@material-ui/icons/HighlightOffOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import DoneIcon from "@material-ui/icons/DoneOutlineOutlined";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { RefreshOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  completedList: {
    textDecoration: "line-through",
    color: "grey",
  },
}));

export default function Todolist(props) {
  const classes = useStyles();
  const [task, setTask] = useState("");
  const [current, setCurrent] = useState([]);
  const [completed, setCompleted] = useState([]);
  const { id } = props;
  const clearAll = () => {
    setCurrent([]);
    setCompleted([]);
  };
  const clearCompleted = () => {
    setCompleted([]);
  };
  useEffect(() => {
    let localCurrent = localStorage.getItem("current" + id);
    let localCompleted = localStorage.getItem("completed" + id);
    localCurrent = localCurrent ? localCurrent : "[]";
    localCompleted = localCompleted ? localCompleted : "[]";
    setCurrent(JSON.parse(localCurrent));
    setCompleted(JSON.parse(localCompleted));
  }, []);

  useEffect(() => {
    props.setClearAll(clearAll);
    props.setClearCompleted(clearCompleted);
  }, [props.setClearCompleted, props.setClearAll]);

  useEffect(() => {
    localStorage.setItem("current" + id, JSON.stringify([...current]));
    localStorage.setItem("completed" + id, JSON.stringify([...completed]));
  }, [completed, current]);

  const clickAudio = new Audio("click.mp3");
  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrent([...current, task]);
    setTask("");
  };
  const handleDone = (i) => {
    clickAudio.play();
    const newCurrent = [...current];
    newCurrent.splice(i, 1);
    setCurrent(newCurrent);
    setCompleted([...completed, current[i]]);
  };
  const handleDelete = (i) => {
    clickAudio.play();
    const newCurrent = [...current];
    newCurrent.splice(i, 1);
    setCurrent(newCurrent);
  };
  const handleRedo = (i) => {
    clickAudio.play();
    const newCompleted = [...completed];
    newCompleted.splice(i, 1);
    setCompleted(newCompleted);
    setCurrent([...current, completed[i]]);
  };
  const handleDeleteCompleted = (i) => {
    clickAudio.play();
    const newCompleted = [...completed];
    newCompleted.splice(i, 1);
    setCompleted(newCompleted);
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className={classes.demo}>
            <Box mt={1}>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Type task and press enter"
                  variant="outlined"
                  required
                  fullWidth
                  value={task}
                  size="small"
                  onChange={(e) => {
                    setTask(e.target.value);
                  }}
                ></TextField>
              </form>
            </Box>
            <List>
              {current.map((x, i) => (
                <Slide direction="down" in={true}>
                  <ListItem key={i}>
                    <ListItemText
                      style={{ paddingRight: "30px", overflowWrap: "anywhere" }}
                      primary={x}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="Completed"
                        color="primary"
                        onClick={() => handleDone(i)}
                      >
                        <DoneIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="Delete"
                        color="secondary"
                        onClick={() => handleDelete(i)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </Slide>
              ))}
            </List>
            <Divider></Divider>
            <List>
              {completed.map((x, i) => (
                <Slide direction="up" in={true}>
                  <ListItem key={i}>
                    <ListItemText
                      style={{ paddingRight: "30px", overflowWrap: "anywhere" }}
                      className={classes.completedList}
                      primary={x}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="Redo"
                        onClick={() => handleRedo(i)}
                      >
                        <RefreshOutlined />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="Delete"
                        onClick={() => handleDeleteCompleted(i)}
                      >
                        <DeleteOutlinedIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </Slide>
              ))}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
