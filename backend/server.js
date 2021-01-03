const express = require("express"); 
const app = express(); 
const path = require("path"); 
const server = require('http').createServer(app)
const socketio = require("socket.io"); 
const io = socketio(server); 
const roomRoutes = require('./routes/room');
require('./socket.js')(io);

app.use(express.static(path.join(__dirname, "..", "frontend", "build")))
app.use(express.static("public"))


// ROUTES API
app.get('/rooms', roomRoutes)
app.get('/rooms/:id/messages', roomRoutes)
app.get('/rooms/:id/lastMessages', roomRoutes)

// If user try to enter url directly...
app.use('/chat', (req, res) => {
  res.redirect('/')
})

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..",  "frontend", "build","index.html"));
});


server.listen(5000, () => {
  console.log("server started on port 5000");
});