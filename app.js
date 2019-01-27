var express = require("express");
var socket = require("socket.io");

var app = express();

app.use(express.static("views"));

var server = app.listen(3000);
console.log("localhost:" + server.address().port);

// Socket setup & pass server
var io = socket(server);
io.on("connection", socket => {
  console.log("made socket connection", socket.id);

  // Handle chat event
  socket.on("chat", function(data) {
    // console.log(data);
    io.sockets.emit("chat", data);
  });

  // Handle typing event
  socket.on("typing", function(data) {
    socket.broadcast.emit("typing", data);
  });

  socket.on("online-users", data => {
    io.sockets.emit("online-users", data);
  });
});
