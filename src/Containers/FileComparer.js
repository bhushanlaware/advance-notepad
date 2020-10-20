import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  CallSplit,
  Edit,
  HorizontalSplit,
  Restore,
  SwapHoriz,
  UnfoldLess,
  VerticalSplit,
} from "@material-ui/icons";
import React, { PureComponent, useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

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
  const [viewType, setViewType] = useState("split");
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
        <Box pb={2}>
          <Typography variant="subtitle1" color="textSecondary">
            This app do not upload your data or store it anywhere. So feel free
            to paste senstive data.
          </Typography>
        </Box>
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
              value={secondFile}
              onChange={(v) => {
                setSecondFile(v.target.value);
              }}
            ></TextField>
          </Grid>
        </Grid>
      </Box>
      <Box pt={3} pb={3}>
        <Box style={{ float: "left" }}>
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
        <Box style={{ float: "right" }}>
          <ToggleButtonGroup
            value={viewType}
            size="small"
            onChange={(e, v) => {
              if (v !== null) setViewType(v);
            }}
            exclusive
          >
            <ToggleButton value="split">
              <VerticalSplit fontSize="small"></VerticalSplit> Split
            </ToggleButton>
            <ToggleButton value="unified">
              <HorizontalSplit fontSize="small"></HorizontalSplit>Unified
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      <Box pt={5} pb={2}>
        {checkDiff ? (
          firstFile === secondFile ? (
            <Box style={{ textAlign: "center" }}>
              <Typography variant="h5" color="secondary">
                Both files are identical 🏆.
              </Typography>
            </Box>
          ) : (
            <ReactDiffViewer
              oldValue={firstFile}
              newValue={secondFile}
              splitView={viewType === "split"}
              useDarkTheme={props.isDark}
            />
          )
        ) : null}
      </Box>
    </Container>
  );
};

export default FileComparer;
