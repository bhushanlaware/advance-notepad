import {
  Add,
  Book,
  CheckCircle,
  CompareArrowsOutlined,
  Delete,
  MoreVert,
  Visibility,
} from "@material-ui/icons";
import {
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import PropTypes from "prop-types";
import TreeItem from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import Typography from "@material-ui/core/Typography";

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    "&:hover > $content": {
      backgroundColor: "transparent",
    },
    "&:focus > $content, &$selected > $content": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.background.default})`,
      color: "var(--tree-view-color)",
    },
    "&:focus > $content $label, &:hover > $content $label, &$selected > $content $label": {
      backgroundColor: "transparent",
    },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "$expanded > &": {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    "& $content": {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: "inherit",
    color: "inherit",
  },
  labelRoot: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: "inherit",
    flexGrow: 1,
  },
}));

const MoreMenu = ({
  anchorEl,
  setAnchorEl,
  addPage,
  setNoteId,
  deletePage,
  renamePage,
}) => {
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNoteId("Main");
  };
  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem
        onClick={(e) => {
          addPage(e);
          handleClose();
        }}
      >
        Add
      </MenuItem>
      <MenuItem
        onClick={(e) => {
          renamePage(e);
          handleClose();
        }}
      >
        Rename
      </MenuItem>
      <MenuItem
        onClick={(e) => {
          deletePage(e);
          handleClose();
        }}
      >
        Delete
      </MenuItem>
    </Menu>
  );
};

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const [title, setTitle] = useState("");
  const handleRename = (e) => {
    e.preventDefault();
    e.stopPropagation();
    props.onRename(props.nodeId, title);
  };
  const {
    to,
    labelText,
    setNoteId,
    labelIcon: LabelIcon,
    labelInfo,
    color,
    selected,
    bgColor,
    addPage,
    deletePage,
    moreAction,
    setAnchorEl,
    ...other
  } = props;

  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <TreeItem
        selected
        label={
          !props.rename ? (
            <div className={classes.labelRoot}>
              <LabelIcon color="inherit" className={classes.labelIcon} />
              <Typography variant="body2" className={classes.labelText}>
                {labelText}
              </Typography>

              <span>
                {addPage ? (
                  <Tooltip title="Add page">
                    <IconButton size="small" color="inherit" onClick={addPage}>
                      <Add></Add>
                    </IconButton>
                  </Tooltip>
                ) : null}

                {deletePage ? (
                  <Tooltip title="Delete page">
                    <IconButton size="small">
                      <Delete></Delete>
                    </IconButton>
                  </Tooltip>
                ) : null}
                {moreAction ? (
                  <Tooltip title="More options">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setAnchorEl(e.currentTarget);
                        setNoteId(props.nodeId);
                      }}
                    >
                      <MoreVert></MoreVert>
                    </IconButton>
                  </Tooltip>
                ) : null}
              </span>
            </div>
          ) : (
            <form
              style={{ position: "relative" }}
              required
              autoComplete="off"
              onSubmit={handleRename}
            >
              <TextField
                id="standard-basic"
                fullWidth
                defaultValue={labelText}
                onChange={(e) => {
                  e.stopPropagation();
                  setTitle(e.target.value);
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                selected={true}
                // focused={true}
                // onFocus={(e) => {
                //   e.target.setSelectionRange(0, e.target.value.length);
                // }}
              />
              <IconButton
                style={{
                  position: "absolute",
                  right: 0,
                  top: "-8px",
                }}
                onClick={handleRename}
              >
                <CheckCircle style={{ color: "lightGreen" }}></CheckCircle>
              </IconButton>
            </form>
          )
        }
        style={{
          "--tree-view-color": color,
          "--tree-view-bg-color": bgColor,
        }}
        classes={{
          root: classes.root,
          content: classes.content,
          expanded: classes.expanded,
          selected: classes.selected,
          group: classes.group,
          label: classes.label,
        }}
        {...other}
      />
    </Link>
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  root: {
    height: "70vh",
    flexGrow: 1,
    maxWidth: 400,
  },
});
const AddAllNotes = (
  parent,
  Notes,
  setAnchorEl,
  setNoteId,
  handleRename,
  renameNote
) => {
  const childrens = Notes.filter((x) => x.parent === parent);
  if (childrens.length === 0) {
    return;
  } else {
    return childrens.map((x) => (
      <StyledTreeItem
        to={"/notes/" + x.id}
        nodeId={x.id}
        labelText={x.title}
        labelIcon={Book}
        moreAction
        setAnchorEl={setAnchorEl}
        setNoteId={setNoteId}
        onRename={handleRename}
        rename={x.id === renameNote}
      >
        {AddAllNotes(
          x.id,
          Notes,
          setAnchorEl,
          setNoteId,
          handleRename,
          renameNote
        )}
      </StyledTreeItem>
    ));
  }
};
export default React.memo((props) => {
  const classes = useStyles();
  const location = useLocation();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [noteId, setNoteId] = React.useState(null);
  const [renameNote, setRenameNote] = React.useState(null);
  const [expanded, setExpanded] = React.useState([]);
  const handleAddBook = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newPageId = props.onAddPage("Main", "New Book");
    setRenameNote(newPageId);
  };
  const handleAddPage = (e) => {
    e.preventDefault();
    const newPageId = props.onAddPage(noteId, "New Page");
    setExpanded([...expanded, noteId]);
    setRenameNote(newPageId);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    props.onDeletePage(noteId);
  };
  const handleRename = (noteId, title) => {
    props.onRename(noteId, title);
    setRenameNote(null);
  };
  const handleRenameNote = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setRenameNote(noteId);
  };
  return (
    <>
      <TreeView
        className={classes.root}
        defaultExpanded={expanded}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
        onNodeToggle={(e, ids) => {
          setExpanded([...ids]);
        }}
        expanded={expanded}
      >
        <StyledTreeItem
          selected={location.pathname.includes("todo")}
          to="/todo"
          nodeId="1"
          labelText="Todo"
          labelIcon={DoneOutlineIcon}
          color="#e3742f"
          bgColor={
            theme.palette.type === "dark"
              ? theme.palette.background.default
              : "#fcefe3"
          }
        />
        <StyledTreeItem
          selected={location.pathname.includes("filecompare")}
          to="/filecompare"
          nodeId="121"
          labelText="File Comparer"
          labelIcon={CompareArrowsOutlined}
          color="#00c3a8"
          bgColor={
            theme.palette.type === "dark"
              ? theme.palette.background.default
              : "#ecfff9"
          }
        />
        <StyledTreeItem
          selected={location.pathname.includes("jsonviewer")}
          to="/jsonviewer"
          nodeId="122"
          labelText="Json Viewer"
          labelIcon={Visibility}
          color="#00c332"
          bgColor={
            theme.palette.type === "dark"
              ? theme.palette.background.default
              : "#ecffee"
          }
        />
        <StyledTreeItem
          nodeId="Main"
          labelText="Notes"
          labelIcon={LibraryBooksIcon}
          to="/notes/files"
          color="#228be8"
          bgColor={
            theme.palette.type === "dark"
              ? theme.palette.background.default
              : "#dcf4ff"
          }
          addPage={handleAddBook}
        >
          {AddAllNotes(
            "Main",
            props.notes,
            setAnchorEl,
            setNoteId,
            handleRename,
            renameNote
          )}
        </StyledTreeItem>

        <MoreMenu
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          setNoteId={setNoteId}
          addPage={handleAddPage}
          deletePage={handleDelete}
          renamePage={handleRenameNote}
        ></MoreMenu>
      </TreeView>
    </>
  );
});
