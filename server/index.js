const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http, {
  cors: {
    origin: "*",
  },
});
const port = 3000;

//inputting our position values 
let position = {
  x: 200,
  y: 200,
};

//connection to emit the positions to all connected clients
Socketio.on("connection", (socket) => {
  socket.emit("position", position);
//connection to the move buttons and method to send back conditions to perform 
  socket.on("move", (data) => {
    switch (data) {
      case "left":
        position.x -= 5;
        Socketio.emit("position", position);
        break;
      case "right":
        position.x += 5;
        Socketio.emit("position", position);
        break;
      case "up":
        position.y -= 5;
        Socketio.emit("position", position);
        break;
      case "down":
        position.y += 5;
        Socketio.emit("position", position);
        break;
    }
  });
});

//listening to a PORT 
Http.listen(port, () => {
  console.log("Server up and running on port " + port);
});