import { Add, Delete, MoreVert, Note } from "@material-ui/icons";
import { IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import ForumIcon from "@material-ui/icons/Forum";
import InfoIcon from "@material-ui/icons/Info";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import PropTypes from "prop-types";
import React from "react";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
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

const MoreMenu = ({ anchorEl, setAnchorEl }) => {
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>Add</MenuItem>
      <MenuItem onClick={handleClose}>Rename</MenuItem>
      <MenuItem onClick={handleClose}>Delete</MenuItem>
    </Menu>
  );
};

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();

  const {
    to,
    labelText,
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
          <div className={classes.labelRoot}>
            <LabelIcon color="inherit" className={classes.labelIcon} />
            <Typography variant="body2" className={classes.labelText}>
              {labelText}
            </Typography>

            <span>
              {addPage ? (
                <Tooltip title="Add page">
                  <IconButton size="small" color="inherit">
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
                    }}
                  >
                    <MoreVert></MoreVert>
                  </IconButton>
                </Tooltip>
              ) : null}
            </span>
          </div>
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
    height: "69vh",
    flexGrow: 1,
    maxWidth: 400,
  },
});
const AddAllNotes = (parent, Notes, setAnchorEl) => {
  const childrens = Notes.filter((x) => x.parent === parent);
  if (childrens.length === 0) {
    return (
      <StyledTreeItem
        nodeId={Notes.id}
        labelText={Notes.title}
        labelIcon={Note}
        moreAction
        setAnchorEl={setAnchorEl}
      />
    );
  } else {
    return (
      <StyledTreeItem
        nodeId={Notes.id}
        labelText={Notes.title}
        labelIcon={Note}
        moreAction
        setAnchorEl={setAnchorEl}
      >
        {childrens.map((x) => (
          <StyledTreeItem
            nodeId={x.id}
            labelText={x.title}
            labelIcon={Note}
            moreAction
            setAnchorEl={setAnchorEl}
          >
            {AddAllNotes(x.id, Notes, setAnchorEl)}
          </StyledTreeItem>
        ))}
      </StyledTreeItem>
    );
  }
};
export default function GmailTreeView(props) {
  const classes = useStyles();
  const location = useLocation();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  return (
    <>
      <TreeView
        className={classes.root}
        defaultExpanded={["3"]}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
      >
        <StyledTreeItem
          selected={location.pathname.includes("todo")}
          to="todo"
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
          nodeId="3"
          labelText="Notes"
          labelIcon={LibraryBooksIcon}
          to="notes"
          color="#3c8039"
          bgColor={
            theme.palette.type === "dark"
              ? theme.palette.background.default
              : "#e6f4ea"
          }
          addPage
        >
          {AddAllNotes("Main", props.notes, setAnchorEl)}
        </StyledTreeItem>

        <MoreMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl}></MoreMenu>
      </TreeView>
    </>
  );
}
