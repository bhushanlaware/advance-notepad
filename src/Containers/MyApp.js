import React, { Component, Suspense, lazy } from "react";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import { Box } from "@material-ui/core";
import Drawer from "../Components/Drawer";
import FullPageLoader from "../Components/FullPageLoader";
import Library from "./Library";
import AppHome from "./AppHome";
import { createBrowserHistory } from "history";
import { saveAs } from "file-saver";
import { withSnackbar } from "notistack";

const Board = lazy(() => import("../Components/Todo/Board"));
const Editor = lazy(() => import("./Editor"));
const FileComparer = lazy(() => import("./FileComparer"));
const JsonViewer = lazy(() => import("./JsonViewer"));

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
    this.props.enqueueSnackbar("Notes exported successfully", {
      variant: "success",
    });
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
        this.props.enqueueSnackbar("Notes imported successfully.", {
          variant: "success",
        });
      } else throw new Error();
    } catch {
      console.log("Not valid import file");

      this.props.enqueueSnackbar("Not valid import file.", {
        variant: "error",
      });
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
  componentDidUpdate = () => {};

  handleAddPage = (parentId, title) => {
    const book = new Book(parentId, title);
    const newNotes = [...this.state.notes, book];
    if (parentId !== "Main")
      newNotes[newNotes.findIndex((x) => x.id === parentId)].childs++;
    this.setState({ notes: newNotes });
    this.updateLocalStorage(newNotes);

    return book.id;
  };
  handleDeletePage = (id) => {
    let newNotes = [];

    //if id is not main
    if (id !== "Main") {
      const allChilds = this.getAllChilds(id);
      newNotes = this.state.notes.filter((x) => !allChilds.includes(x));
      newNotes = newNotes.filter((x) => x.id !== id);
      const parentId = this.state.notes[
        this.state.notes.findIndex((x) => x.id === id)
      ].parent;
      if (parentId !== "Main") {
        newNotes[newNotes.findIndex((x) => x.id === parentId)].childs--;
      }
    } else {
      newNotes = [];
    }
    this.setState({ notes: newNotes });
    this.updateLocalStorage(newNotes);
  };

  getAllChilds = (id) => {
    const childs = this.state.notes.filter((x) => x.parent === id);
    if (childs.length) {
      childs.forEach((x) => childs.push(...this.getAllChilds(x.id)));
    }
    return childs;
  };
  handleRename = (id, title, rewriteHeading = false) => {
    if (title === "") return;
    const tempNotes = [...this.state.notes];
    const index = tempNotes.findIndex((x) => x.id === id);

    tempNotes[index].title = title;
    this.setState({ notes: tempNotes });
    this.updateLocalStorage(tempNotes);
  };
  handleChange = (id, text) => {
    debugger;
    const tempNotes = [...this.state.notes];
    const index = tempNotes.findIndex((x) => x.id === id);
    if (index < 0) return;
    tempNotes[index].notes = text.replace(
      /<p><br><\/p><p><br><\/p>/g,
      "<p><br><p>"
    );
    this.setState({ notes: tempNotes });
    this.updateLocalStorage(tempNotes);
  };
  updateLocalStorage = (notes) => {
    debugger;
    localStorage.setItem("notes", JSON.stringify(notes));
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
        <Suspense fallback={<FullPageLoader />}>
          <Router history={browserHistory}>
            <Drawer
              {...this.props}
              notes={this.state.notes}
              onRename={this.handleRename}
              onAddPage={this.handleAddPage}
              onDeletePage={this.handleDeletePage}
            >
              <Switch>
                <Redirect exact from="/" to="/apphome"></Redirect>
                <Route path="/apphome" exact component={AppHome}></Route>
                <Route path="/todo" exact component={TodoPage}></Route>
                <Route
                  path="/filecompare"
                  exact
                  render={() => <FileComparer isDark={this.props.isDark} />}
                ></Route>
                <Route
                  path="/jsonviewer"
                  exact
                  render={() => <JsonViewer isDark={this.props.isDark} />}
                ></Route>
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
        </Suspense>
      </>
    );
  }
}

export default withSnackbar(MyApp);
