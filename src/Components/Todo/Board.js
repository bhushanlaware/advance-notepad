import { Box, Container, Fab, Grid, Typography, Zoom } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { Add } from "@material-ui/icons";
import ConfirmationDialog from "../ConfirmationDialog";
import TodoCard from "./TodoCard";
import { makeStyles } from "@material-ui/core/styles";
import TodoAds from "../GoogleAds/TodoAds";

const useStyle = makeStyles((theme) => ({
  floatingBtn: {
    position: "fixed",
    right: "3%",
    bottom: "3%",
    color: "white",
  },
  container: {
    columnCount: 3,
    [theme.breakpoints.down("sm")]: {
      columnCount: 1,
    },
    [theme.breakpoints.up("md")]: {
      columnCount: 2,
    },
    [theme.breakpoints.up("lg")]: {
      columnCount: 3,
    },
    [theme.breakpoints.up("xl")]: {
      columnCount: 4,
    },
  },
  item: {
    "-webkit-column-break-inside": "avoid",
    "page-break-inside": "avoid",
    " break-inside": "avoid",
    paddingBottom: "15px",
  },
}));
const getId = () => {
  return Date.now();
};
const Board = () => {
  const classes = useStyle();
  const [cards, setCards] = useState([]);
  const [deleteCard, setDeleteCard] = useState(false);

  useEffect(() => {
    let localCards = localStorage.getItem("cards");
    localCards = localCards ? localCards : "[]";
    setCards(JSON.parse(localCards));
    // setCards(JSON.parse(localStorage.getItem("cards") || "") || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify([...cards]));
  }, [cards]);

  const handleSetTitle = (title, id) => {
    const newCards = cards.map((x) => {
      if (x.id === id) {
        x.title = title;
      }
      return x;
    });
    setCards(newCards);
  };
  const handleDelete = (id) => {
    setDeleteCard(id);
  };
  const handleRemoveCard = (id) => {
    const newCards = cards.filter((x) => x.id !== id);
    setCards([...newCards]);
    localStorage.removeItem("current" + id);
    localStorage.removeItem("completed" + id);
  };
  const onDeleteConfirm = () => {
    const newCards = cards.map((x) => {
      if (x.id === deleteCard) {
        x.delete = true;
      }
      return x;
    });
    setCards(newCards);
    setDeleteCard(false);
  };
  const handleAddCard = () => {
    setCards([...cards, { id: getId(), title: "Todo" }]);
  };
  // const handleRemoveCa74rd = (i) => {
  //   const newCards = [...cards];
  //   newCards.splice(i, 1);
  //   setCards(newCards);
  // };
  // const handleAddCard = () => {
  //   setCards([
  //     ...cards,
  //     <TodoCard index={cards.length} onRemoveCard={handleRemoveCard} />,
  //   ]);
  // };

  return (
    <>
      {cards.length === 0 ? (
        <Box p={2} style={{ width: "100%", textAlign: "center" }}>
          <Typography variant="h4">
            No Todo's created yet.<br></br> Please add Todo card by clicking the
            below button.
          </Typography>
        </Box>
      ) : (
        <div container className={classes.container}>
          <TodoAds></TodoAds>
          {cards.map((x, i) => (
            <Zoom
              in={!x.delete}
              mountOnEnter
              unmountOnExit
              onExited={() => {
                handleRemoveCard(x.id);
              }}
            >
              <div item className={classes.item} key={x.id}>
                <TodoCard
                  id={x.id}
                  removeCard={handleDelete}
                  title={x.title}
                  setTitle={handleSetTitle}
                />
              </div>
            </Zoom>
          ))}
        </div>
      )}
      {/* <IconButton
        aria-label="Add Todo"
        size="medium"
        className={classes.floatingBtn}
      ></IconButton> */}
      <Fab
        color="secondary"
        aria-label="add"
        className={classes.floatingBtn}
        onClick={handleAddCard}
      >
        <Add />
      </Fab>

      <ConfirmationDialog
        open={deleteCard}
        setOpen={setDeleteCard}
        confirm={onDeleteConfirm}
        type="todo"
      ></ConfirmationDialog>
    </>
  );
};

export default Board;
