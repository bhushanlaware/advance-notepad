import React, { Component } from "react";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import Board from "../Components/Todo/Board";
import { Box } from "@material-ui/core";
import Drawer from "../Components/Drawer";
import Editor from "./Editor";
import QuillEditor from "../Components/QuillEditor";
import { createBrowserHistory } from "history";

const browserHistory = createBrowserHistory();

class Book {
  constructor(parent) {
    this.id = Date.now();
    this.title = "";
    this.notes = "";
    this.parent = parent;
  }
}

const TodoPage = () => {
  return (
    <Box p={2}>
      <Board />
    </Box>
  );
};

class MyApp extends Component {
  state = { notes: [], fileLocation: "", openNote: null };

  componentWillMount = () => {
    const fileLocation = localStorage.getItem("fileLocation") || "";
    console.log("mounter");

    this.setState({ fileLocation });
    if (fileLocation === "") {
      const book = new Book("Main");
      this.setState({ notes: [book], openNote: book });
    }
  };

  handleAddPage = (id) => {
    const book = new Book(id);
    this.setState({ notes: [book] });
  };
  handleDeletePage = (id) => {
    this.setState({ notes: this.state.notes.filter((x) => x.id !== id) });
  };

  handleRename = (id, title) => {
    const tempNotes = [...this.state.notes];
    const index = tempNotes.findIndex((x) => x.id === id);
    tempNotes[index].title = title;
    this.setState({ notes: tempNotes });
  };
  handleChange = (id, text) => {
    const tempNotes = [...this.state.notes];
    const index = tempNotes.findIndex((x) => x.id === id);
    tempNotes[index].notes = text;
    this.setState({ notes: tempNotes });
  };
  handleOpenNote = (id) => {
    const openNote = this.state.notes[
      this.state.notes.findIndex((x) => x.id === id)
    ];
    this.setState({ openNote });
  };
  render() {
    return (
      <>
        <Router history={browserHistory}>
          <Drawer
            {...this.props}
            notes={this.state.notes}
            onRename={this.handleRename}
            onAddPage={this.handleAddPage}
            onDeletePage={this.handleDeletePage}
          >
            <Switch>
              <Redirect exact from="/" to="/todo"></Redirect>
              <Route path="/todo" exact component={TodoPage}></Route>
              <Route
                path="/notes"
                render={() => (
                  <Editor
                    openNote={this.state.openNote}
                    onChange={this.handleChange}
                  />
                )}
                exact
              ></Route>
            </Switch>
          </Drawer>
        </Router>
      </>
    );
  }
}

export default MyApp;
