class Core {
  constructor(connection) {
    this.server = connection;
  }

  init() {
    let ws = new WebSocket("ws://localhost:4000");
    this.server = ws;

    ws.onopen = () => {};
  }
}

export default Core;
