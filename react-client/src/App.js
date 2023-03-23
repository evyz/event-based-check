import React from "react";
import Core from "./client-architecture/core";

class Hello extends React.Component {
  render() {
    return <h2>aaa</h2>;
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.core = null;
    this.windowRef = <Hello />;
  }

  componentDidMount() {
    this.core = new Core(this.windowRef);
    this.core.init();
  }

  render() {
    return <div id='system-window'>{this.windowRef}</div>;
  }
}

export default App;
