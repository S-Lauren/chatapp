const express = require("express"); 
const app = express(); 
const path = require("path"); 
const server = require('http').createServer(app)
const socketio = require("socket.io"); 

const io = socketio(server); 


app.use(express.static(path.join(__dirname, "..", "frontend", "build")))
app.use(express.static("public"))

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..",  "frontend", "build","index.html"));
});


// io test

io.on("connection", (socket) => {
  console.log("a user has connected"); 
  socket.emit("msg")
})

server.listen(5000, () => {
  console.log("server started on port 5000");
});