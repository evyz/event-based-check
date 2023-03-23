const express = require("express");
const app = express();
const ws = require("express-ws")(app);

let users = []

let methods = [
  {name: "createUser", fn: function(context){
    console.log('context',context.context.childContext)
    context = context.context

    let self = context,
      childSelf = context.childContext

    function getValueAsync( name){
      return childSelf.find(item => item.name === name).value
    }

      childSelf = childSelf.map(item => {
        return {
          value: item.value, name: item.nameValue
        }
      })

      // childSelf.forEach((item) => {
        users.push({name:getValueAsync('name'), surname: getValueAsync('surname'), thirdname: getValueAsync('age') })
      // })
  }}
]

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
        templateID: 2,
      },
      {
        id: 3,
        title: "Второй подраздел",
        type: "default-header-chapter",
        templateID: 3,
      },
      {
        id: 4,
        title: "Третий подраздел",
        type: "default-header-chapter",
        templateID: 1,
      },
    ],
  },
    {
    id: 5,
    title: "Второй раздел",
    type: "default-header-chapter",
    childs: [
      {
        id: 6,
        title: "Пользователи",
        type: "default-header-chapter",
        templateID: 7
      },
      {
        id: 7,
        title: "Второй подраздел",
        type: "default-header-chapter",
      },
      {
        id: 8,
        title: "Третий подраздел",
        type: "default-header-chapter",
      },
    ],
  },
];

let templates = [
  {
    id: 1,
    title: "Форма какая-то",
    content: [
      {id: 2, type: "default-input", label: "Введите имя пользователя"},
    ] 
  },
  {
    id: 2,
    title: "Форма для первого раздела",
    content: [
      {id: 100, type: "default-input", value: "name",  label: "Введите имя пользователя"},
      {id: 101, type: "default-input", value: "surname", label: "Введите фамилия пользователя"},
      {id: 102, type: "default-input", value: "age", label: "Введите возраст пользователя"},
      {id: 103, type: "default-button", label: "Записать пользователя", events: [
        {type:"onclick",  method: "createUser" }
      ]}
    ] 
  },{
    id: 7,
    title: "Пользователи",
    content: 
      users.map(user => {
        return {id: new Date().getTime(), type: "default-input", value: "name", resValue: user.name, label: "Имя пользователя"}
      })
    ,
    calc(){
      this.content = users.map(user => {
        return {id: new Date().getTime(), type: "default-input", value: "name", resValue: user.name, label: "Имя пользователя"}
      })
    }
  }
]

app.ws("/", (ws, req) => {
  ws.on("message", (data) => {
    let parsed = JSON.parse(data);
    const { eventName, payload } = parsed;
    ws.emit(eventName, {...payload});
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

  ws.on("check-changes", data => {
    let { element, subscribeID, templateID } = data;
    switch (element["widget-type"]) {
      case "default-window":
        let template = templates.find(item => item.id === templateID)
        if(template){
          if(template?.calc){
            template?.calc()
          }          


      ws.send(JSON.stringify({
              emitType: "check-changes",
              payload: templates.find(item => item.id === templateID),
              type: element["widget-type"],
              subscribeID: subscribeID,
          }))
        }else{

          ws.send(JSON.stringify({
              emitType: "check-changes",
              error: "NOT FOUND TEMPLATE",
              type: element["widget-type"],
              subscribeID: subscribeID,
          }))
        }
   
        break;
    }
  })  

  ws.on('call-method', data => {
    let {methodName, subscribeID, context} = data
    let method = methods.find(method => method.name === methodName)
    if(method){
      method.fn(context)
    }
  })
});

app.listen(4000, () => {
  console.log("started");
});
