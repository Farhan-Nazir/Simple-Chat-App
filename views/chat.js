// Make connection
var socket = io.connect("http://localhost:3000");

// Query DOM
var message = document.getElementById("message"),
  btn = document.getElementById("send"),
  output = document.getElementById("output"),
  btn_submit = document.getElementById("submit"),
  input_username = document.getElementById("input_username"),
  feedback = document.getElementById("feedback");
let ul = document.getElementById("online-users");

window.onload = () => {
  message.style.visibility = "hidden";
  btn.style.visibility = "hidden";
};

// Emit Login
function getList() {
  let allList = [];
  btn_submit.addEventListener("click", function() {
    socket.on("online-users", data => {
      let listItems = document.createElement("li");
      listItems.appendChild(document.createTextNode(data + " is online"));
      ul.appendChild(listItems);
      allList.push(listItems);
      console.log(data);
    });
    socket.emit("online-users", input_username.value);
    btn_submit.style.visibility = "hidden";
    input_username.disabled = true;
    message.style.visibility = "visible";
    btn.style.visibility = "visible";
  });
  console.log(allList.length);
  return allList;
}

// Emit events
btn.addEventListener("click", function() {
  socket.emit("chat", {
    message: message.value,
    title: input_username.value
  });
  message.value = "";
  //socket.emit("online-users", input_username.value);
});

message.addEventListener("keypress", function() {
  socket.emit("typing", input_username.value);
  
});

// Listen for events
socket.on("chat", function(data) {
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.title + ": </strong>" + data.message + "</p>";
});

socket.on("typing", function(data) {
  feedback.innerHTML = "<p><em>" + data + " is typing a message...</em></p>";
});

//List of online users
