import React, { Component, lazy } from "react";
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
import Library from "./Library";
import { createBrowserHistory } from "history";
import { saveAs } from "file-saver";

const browserHistory = createBrowserHistory();

class Book {
  constructor(parent, title) {
    this.id = Date.now().toString();
    this.title = title;
    this.notes = `<h1>${title}</h1>`;
    this.parent = parent;
    this.childs = 0;
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
      const book = new Book("Main", "My Book");
      this.setState({ notes: [book], openNote: book });
    }
  };
  handleKeyPress = (e) => {
    //!Ctrl +S
    if (e.ctrlKey && e.keyCode === 83) {
      e.preventDefault();
      const content = JSON.stringify(this.state.notes);
      // var blob = new Blob([content], {
      //   type: "application/json",
      // });
      // saveAs(blob, "notes.json");
      localStorage.setItem("notes", JSON.stringify(this.state.notes));
    }
    //!Ctrl +N
    if (e.ctrlKey && e.keyCode === 78) {
      e.preventDefault();
      console.log("New");
    }
    //!Ctrl+O
    if (e.ctrlKey && e.keyCode === 79) {
      e.preventDefault();
      console.log("Open");
    }
  };
  componentDidMount = () => {
    document.addEventListener("keydown", this.handleKeyPress);
    const localNotes = localStorage.getItem("notes") || "[]";
    this.setState({ notes: JSON.parse(localNotes) });
  };
  componentWillUnmount = () => {
    document.removeEventListener("keydown", this.handleKeyPress);
  };
  componentDidUpdate = () => {
    localStorage.setItem("notes", JSON.stringify(this.state.notes));
  };
  handleAddPage = (parentId, title) => {
    const book = new Book(parentId, title);
    const newNotes = [...this.state.notes, book];
    if (parentId !== "Main")
      newNotes[newNotes.findIndex((x) => x.id === parentId)].childs++;
    this.setState({ notes: newNotes });
    return book.id;
  };
  handleDeletePage = (id) => {
    const newNotes = this.state.notes.filter((x) => x.id !== id);
    const parentId = this.state.notes[
      this.state.notes.findIndex((x) => x.id === id)
    ].parent;
    if (parentId !== "Main") {
      newNotes[newNotes.findIndex((x) => x.id === parentId)].childs--;
    }
    this.setState({ notes: newNotes });
  };

  handleRename = (id, title, rewriteHeading = false) => {
    if (title === "") return;
    const tempNotes = [...this.state.notes];
    const index = tempNotes.findIndex((x) => x.id === id);

    tempNotes[index].title = title;
    this.setState({ notes: tempNotes });
  };
  handleChange = (id, text) => {
    const tempNotes = [...this.state.notes];
    const index = tempNotes.findIndex((x) => x.id === id);
    if (index < 0) return;
    tempNotes[index].notes = text;
    this.setState({ notes: tempNotes });
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
                exact
                render={() => <Library notes={this.state.notes} />}
              ></Route>
              <Route
                path="/notes/:id"
                render={(props) => (
                  <Editor
                    notes={this.state.notes}
                    onChange={this.handleChange}
                    {...props}
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
