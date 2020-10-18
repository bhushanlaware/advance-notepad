import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { Edit, Restore, SwapHoriz } from "@material-ui/icons";
import React, { PureComponent, useState } from "react";

import ReactDiffViewer from "react-diff-viewer";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  textBox: {
    borderRadius: 0,
  },
}));
const oldCode = `
const a = 10
const b = 10
const c = () => console.log('foo')
 
if(a > 10) {
  console.log('bar')
}
 
console.log('done')
`;
const newCode = `
const a = 10
const boo = 10
 
if(a === 10) {
  console.log('bar')
}
`;
const FileComparer = (props) => {
  const classes = useStyle();
  const [firstFile, setFirstFile] = useState("");
  const [secondFile, setSecondFile] = useState("");
  const [checkDiff, setCheckDiff] = useState(false);
  const handleCheckDiff = () => {
    if (firstFile && secondFile) setCheckDiff(true);
  };
  const handleReset = () => {
    setFirstFile("");
    setSecondFile("");
    setCheckDiff(false);
  };
  const handleEdit = () => {
    setCheckDiff(false);
  };
  const handleSwap = () => {
    setFirstFile(secondFile);
    setSecondFile(firstFile);
  };
  return (
    <Container fluid>
      <Box pt={2}>
        <Grid container>
          <Grid xs={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="Original text"
              style={{ borderRadius: 0 }}
              multiline
              rows={8}
              disabled={checkDiff}
              placeholder="Original text"
              value={firstFile}
              onChange={(v) => {
                setFirstFile(v.target.value);
              }}
            ></TextField>
          </Grid>
          <Grid xs={6}>
            <TextField
              variant="outlined"
              fullWidth
              disabled={checkDiff}
              label="Changed text"
              style={{ borderRadius: 0 }}
              multiline
              rows={8}
              placeholder="Changed text"
              value={secondFile}
              onChange={(v) => {
                setSecondFile(v.target.value);
              }}
            ></TextField>
          </Grid>
        </Grid>
      </Box>
      <Box p={3} style={{ textAlign: "center" }}>
        {checkDiff ? (
          <ButtonGroup variant="contained" color="primary">
            <Button onClick={handleEdit} startIcon={<Edit></Edit>}>
              Edit
            </Button>
            <Button onClick={handleSwap} startIcon={<SwapHoriz></SwapHoriz>}>
              Swap
            </Button>
            <Button onClick={handleReset} startIcon={<Restore></Restore>}>
              Reset
            </Button>
          </ButtonGroup>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckDiff}
            disabled={!firstFile && !secondFile}
          >
            Check Difference
          </Button>
        )}
      </Box>
      <Box style={{ textAlign: "center" }}>
        {checkDiff ? (
          firstFile === secondFile ? (
            <Typography variant="h5" color="secondary">
              Both files are identical 🏆.
            </Typography>
          ) : (
            <ReactDiffViewer
              oldValue={firstFile}
              newValue={secondFile}
              splitView={true}
              useDarkTheme={props.isDark}
            />
          )
        ) : null}
      </Box>
    </Container>
  );
};

export default FileComparer;
