import React, { Component, lazy } from "react";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import Board from "../Components/Todo/Board";
import { Box } from "@material-ui/core";
import ConfirmationDialog from "../Components/ConfirmationDialog";
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

  exportNotes = () => {
    const content = JSON.stringify(this.state.notes);
    var blob = new Blob([content], {
      type: "application/json",
    });
    saveAs(blob, "notes.json");
  };
  importNotes = () => {
    this.fileRef.click();
  };
  handleUpload = (e) => {
    // debugger;
    // console.log(e.target.value);
    this.fileReader = new FileReader();
    this.fileReader.onloadend = this.handleFileRead;
    this.fileReader.readAsText(e.target.files[0]);
  };
  handleFileRead = (e) => {
    const content = this.fileReader.result;
    debugger;
    try {
      const uploadedNotes = JSON.parse(content);
      if (uploadedNotes && uploadedNotes.length > 0) {
        uploadedNotes.forEach((x) => {
          if (x.title && x.notes && x.id) {
            //will continue upload
          } else {
            throw new Error();
          }
        });
        this.setState({ notes: uploadedNotes });
        localStorage.setItem("notes", JSON.stringify(uploadedNotes));
      } else throw new Error();
    } catch {
      console.log("Not valid import file");
    }
    // … do something with the 'content' …
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
    try {
      const localNotes = localStorage.getItem("notes") || "[]";
      this.setState({ notes: JSON.parse(localNotes) });
    } catch {
      localStorage.removeItem("notes");
    }
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
        <input
          type="file"
          ref={(i) => (this.fileRef = i)}
          onChange={this.handleUpload}
          style={{ display: "none" }}
          accept=".json"
        ></input>
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
                path="/notes/files/*"
                render={(props) => (
                  <Library
                    {...props}
                    notes={this.state.notes}
                    onRename={this.handleRename}
                    onAddPage={this.handleAddPage}
                    onDeletePage={this.handleDeletePage}
                    export={this.exportNotes}
                    import={this.importNotes}
                  />
                )}
              ></Route>
              <Route
                path="/notes/files"
                render={(props) => (
                  <Library
                    {...props}
                    notes={this.state.notes}
                    onRename={this.handleRename}
                    onAddPage={this.handleAddPage}
                    onDeletePage={this.handleDeletePage}
                    export={this.exportNotes}
                    import={this.importNotes}
                  />
                )}
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
              <Redirect from="/" to="/todo"></Redirect>
            </Switch>
          </Drawer>
        </Router>
      </>
    );
  }
}

export default MyApp;
