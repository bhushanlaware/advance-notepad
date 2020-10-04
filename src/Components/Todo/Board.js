import { Box, Fab, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { Add } from "@material-ui/icons";
import TodoCard from "./TodoCard";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  floatingBtn: {
    position: "fixed",
    right: "3%",
    bottom: "3%",
    color: "white",
  },
}));
const getId = () => {
  return Date.now();
};
const Board = () => {
  const classes = useStyle();
  const [cards, setCards] = useState([]);

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

  const handleRemoveCard = (id) => {
    console.log(id);
    const newCards = cards.filter((x) => x.id !== id);
    setCards([...newCards]);
    localStorage.removeItem("current" + id);
    localStorage.removeItem("completed" + id);
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
            No Todo's
            <span role="img" aria-label="todo">
              📃
            </span>
            created yet.<br></br> Please add Todo card by clicking the button
            below
            <span role="img" aria-label="todo">
              ⚡.
            </span>{" "}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {cards.map((x, i) => (
            <Grid item xs={12} md={6} key={x.id} lg={4}>
              <TodoCard
                id={x.id}
                removeCard={handleRemoveCard}
                title={x.title}
                setTitle={handleSetTitle}
              />
            </Grid>
          ))}
        </Grid>
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
    </>
  );
};

export default Board;
