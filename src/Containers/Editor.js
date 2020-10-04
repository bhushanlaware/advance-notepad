import React, { Component } from "react";

import QuillEditor from "../Components/QuillEditor";

let timer = null;
class Editor extends Component {
  handleChange = (value) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      this.props.onChange(this.props.openNote.id, value);
    }, 500);
  };
  render() {
    return (
      <QuillEditor
        id={this.props.id}
        onChange={this.handleChange}
        defaultValue={this.props.openNote.notes}
      ></QuillEditor>
    );
  }
}

export default Editor;
