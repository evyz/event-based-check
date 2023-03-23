const express = require("express");
const app = express();
const expressWs = require("express-ws")(app);

app.ws("/", (ws, req) => {
  console.log("ws", ws);
});

app.listen(4000, () => {
  console.log("server v. 2.0 started");
});
