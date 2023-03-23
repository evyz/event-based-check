import React from "react";
import LayoutManager from "./layoutManager";

class Core extends LayoutManager {
  constructor(windowRef) {
    super();
    this.server = null;
    this.windowRef = windowRef;
  }

  init() {
    let ws = new WebSocket("ws://localhost:4000");

    this.server = ws;
    this.server.onopen = (emit) => {
      console.log("emit", emit, this.windowRef);

      let layoutManager = new LayoutManager(this.server, this.windowRef);
      layoutManager.init();
    };
  }
}

export default Core;
