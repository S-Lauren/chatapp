const express = require("express"); 
const app = express(); 
const path = require("path"); 
const server = require('http').createServer(app)
const socketio = require("socket.io"); 
const io = socketio(server); 

require('./socket.js')(io);

app.use(express.static(path.join(__dirname, "..", "frontend", "build")))
app.use(express.static("public"))

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..",  "frontend", "build","index.html"));
});

server.listen(5000, () => {
  console.log("server started on port 5000");
});