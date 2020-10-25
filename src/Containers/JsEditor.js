import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markup";

import Editor from "react-simple-code-editor";
import React from "react";
import { Button } from "@material-ui/core";
import { Hook, Console, Decode, Method } from "console-feed";
// import doesn't seem to work properly with parcel for jsx
require("prismjs/components/prism-jsx");
const code = `function add(a, b) {
  console.log(a + b);
}
add(1,2);
`;

class JsEditor extends React.Component {
  state = {
    code,
    logs: [],
  };
  componentDidMount() {
    Hook(window.console, (log) => {
      this.setState(({ logs }) => ({ logs: [...logs, Decode(log)] }));
    });

    console.log(`Hello world!`);
  }
  handleRun = () => {
    try {
      const script = document.createElement("script");
      script.innerHTML = `try{ ${this.state.code} }catch(e){console.error(e);}`;
      this.removeAllChildNodes(this.runDiv);
      this.runDiv.appendChild(script);
      // this.runDiv.innerHTML =
      //   "<script>" +
      //   `try{ ${this.state.code} }catch(e){console.error(e);}` +
      //   "</script>";
    } catch (e) {
      console.error(e);
    }
  };
  removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
  render() {
    return (
      <>
        <Editor
          value={this.state.code}
          onValueChange={(code) => this.setState({ code })}
          highlight={(code) => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
        />
        <Button onClick={this.handleRun}>Run</Button>
        <div style={{ backgroundColor: "#242424" }}>
          <Console
            logs={this.state.logs}
            variant="light"
            filter={["error", "log"]}
          />
        </div>
        <div className="Run" ref={(el) => (this.runDiv = el)}></div>
      </>
    );
  }
}

export default JsEditor;
