const express = require("express");
const socket = require("socket.io");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static("views"));

const server = app.listen(PORT, () => console.log("localhost:" + server.address().port));

// Socket setup & pass server
const io = socket(server);
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
