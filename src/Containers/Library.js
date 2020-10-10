import { Box, Grid } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";

import Book from "../Components/Book";

const Library = React.memo((props) => {
  const { notes } = props;
  const [showNotes, setShowNotes] = useState([]);
  useEffect(() => {
    const mainNotes = notes.filter((x) => x.parent === "Main");
    setShowNotes(mainNotes);
  }, [notes]);
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
    <Box p={3}>
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
    </Box>
  );
});

export default Library;
