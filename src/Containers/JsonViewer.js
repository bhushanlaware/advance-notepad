import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { Edit, Restore, Visibility } from "@material-ui/icons";
import React, { useState } from "react";

import ReactJson from "react-json-view";

const JsonViewer = (props) => {
  const [json, setJson] = useState("");
  const [obj, setObj] = useState(null);
  const [invalid, setInvalid] = useState(false);
  const [view, setView] = useState(false);
  const handleView = () => {
    try {
      const myObj = JSON.parse(json);
      setInvalid(false);
      setObj(myObj);
    } catch {
      setInvalid(true);
      setObj(null);
    } finally {
      setView(true);
    }
  };
  const handleEdit = () => {
    setView(false);
  };
  const handleReset = () => {
    setInvalid(false);
    setJson("");
    setObj(null);
    setView(false);
  };
  return (
    <Box p={3}>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            label="Enter raw JSON"
            value={json}
            multiline
            rows={10}
            fullWidth
            variant="outlined"
            onChange={(e) => {
              setJson(e.target.value);
            }}
            disabled={view}
          ></TextField>
        </Grid>
      </Grid>
      <Box pt={2} pb={2}>
        {view ? (
          <ButtonGroup variant="contained" color="primary">
            <Button startIcon={<Edit />} onClick={handleEdit}>
              Edit
            </Button>
            <Button startIcon={<Restore />} onClick={handleReset}>
              Reset
            </Button>
          </ButtonGroup>
        ) : (
          <Button
            variant="contained"
            color="primary"
            startIcon={<Visibility />}
            onClick={handleView}
          >
            View JSON
          </Button>
        )}
      </Box>
      {view ? (
        <Box style={{ fontSize: "1.2rem" }}>
          {obj && !invalid ? (
            <ReactJson
              displayDataTypes={false}
              src={obj}
              theme={props.isDark ? "monokai" : "summerfruit:inverted"}
            />
          ) : (
            <Typography variant="h6" color="secondary">
              Provided Json is not valid ⛏.
            </Typography>
          )}
        </Box>
      ) : null}
    </Box>
  );
};

export default JsonViewer;
