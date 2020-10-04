import PropTypes from "prop-types";
import React from "react";
import ReactQuill from "react-quill";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    "& .ql-toolbar": {
      borderLeft: "none",
      borderTop: "none",
      borderRight: "none",
      borderBottom: `1px solid ${theme.palette.divider}`,
      "& .ql-picker-label:hover": {
        color: theme.palette.secondary.main,
      },
      "& .ql-picker-label.ql-active": {
        color: theme.palette.secondary.main,
      },
      "& .ql-picker-item:hover": {
        color: theme.palette.secondary.main,
      },
      "& .ql-picker-item.ql-selected": {
        color: theme.palette.secondary.main,
      },
      "& button:hover": {
        color: theme.palette.secondary.main,
        "& .ql-stroke": {
          stroke: theme.palette.secondary.main,
        },
      },
      "& button:focus": {
        color: theme.palette.secondary.main,
        "& .ql-stroke": {
          stroke: theme.palette.secondary.main,
        },
      },
      "& button.ql-active": {
        "& .ql-stroke": {
          stroke: theme.palette.secondary.main,
        },
      },
      "& .ql-stroke": {
        stroke: theme.palette.text.primary,
      },
      "& .ql-picker": {
        color: theme.palette.text.primary,
      },
      "& .ql-picker-options": {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.default,
        border: "none",
        boxShadow: theme.shadows[10],
        borderRadius: theme.shape.borderRadius,
      },
    },
    "& .ql-container": {
      border: "none",
      "& .ql-editor": {
        fontFamily: theme.typography.fontFamily,
        fontSize: 16,
        color: theme.palette.text.primary,
        "&.ql-blank::before": {
          color: theme.palette.text.secondary,
        },
      },
    },
  },
  stepButton: {
    "& + &": {
      marginLeft: theme.spacing(2),
    },
  },
}));

function QuillEditor({ className, ...rest }) {
  const classes = useStyles();

  return (
    <ReactQuill
      className={clsx(classes.root, className)}
      {...rest}
      modules={QuillEditor.modules}
      formats={QuillEditor.formats}
      style={{ minHeight: "100vh" }}
    />
  );
}

QuillEditor.modules = {
  syntax: true,
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ align: [] }],
    ["link", "image", "video"],
    ["code-block"],
    ["clean"],
    ["fullscreen"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: true,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
QuillEditor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
  "code-block",
  "background",
  "save",
];

/*
 * PropType validation
 */

QuillEditor.propTypes = {
  className: PropTypes.string,
};

export default QuillEditor;
