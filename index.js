const express = require("express");
const app = express();
const ws = require("express-ws")(app);

let header = [
  {
    id: 1,
    title: "Первый раздел",
    type: "default-header-chapter",
    childs: [
      {
        id: 2,
        title: "Первый подраздел",
        type: "default-header-chapter",
      },
      {
        id: 3,
        title: "Второй подраздел",
        type: "default-header-chapter",
      },
      {
        id: 4,
        title: "Третий подраздел",
        type: "default-header-chapter",
      },
    ],
  },
];

app.ws("/", (ws, req) => {
  ws.on("message", (data) => {
    let parsed = JSON.parse(data);
    const { eventName, payload } = parsed;
    ws.emit(eventName, payload);
  });

  ws.on("load-data", (data) => {
    let { element, subscribeID } = data;
    switch (element["widget-type"]) {
      case "default-header":
        ws.send(
          JSON.stringify({
            emitType: "load-data",
            payload: header,
            type: element["widget-type"],
            subscribeID: subscribeID,
          })
        );
        break;
    }
  });
});

app.listen(3000, () => {
  console.log("started");
});
