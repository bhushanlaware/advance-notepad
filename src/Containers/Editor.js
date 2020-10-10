import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";

import QuillEditor from "../Components/QuillEditor";

let timer = null;
class Editor extends Component {
  componentWillReceiveProps = (prevProps) => {
    const prevId = prevProps.match.params.id;
    const id = this.props.match.params.id;
    if (prevId === id) {
      return false;
    }
  };
  handleChange = (value) => {
    const id = this.props.match.params.id;

    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      this.props.onChange(id, value);
    }, 500);
  };

  render() {
    const id = this.props.match.params.id;
    const notes = this.props.notes;
    return notes.findIndex((x) => x.id === id) < 0 ? (
      <Redirect to="/notes"></Redirect>
    ) : (
      <QuillEditor
        id={this.props.id}
        onChange={this.handleChange}
        value={this.props.notes.filter((x) => x.id === id)[0].notes}
      ></QuillEditor>
    );
  }
}

export default Editor;
