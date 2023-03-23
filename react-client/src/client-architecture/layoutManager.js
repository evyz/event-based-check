import React from "react";

class LayoutManager {
  constructor(server, windowRef) {
    this.server = server;
    this.windowRef = windowRef;
  }

  init() {
    this.initMenu();
  }

  initMenu() {
    console.log("windowRef", this.windowRef);

    class Hello extends React.Component {
      render() {
        return <h2>{this.props.title}</h2>;
      }
    }

    this.windowRef = <Hello title={"111"} />;

    console.log(this.windowRef);

    // root.render(React.createElement(Hello, { toWhat: "World" }, null));
  }
}

export default LayoutManager;
