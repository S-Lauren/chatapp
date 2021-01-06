
const connection = require("./models/db")

const numClients = {}; 

module.exports = function(io) {

  io.on("connection", (socket) => {

    /* Send existing room from db */
      connection.query(`SELECT * FROM room`, function(err, results, rows) {
        socket.emit("sendRoom", results)
     })

    /* Event joinRoom for retrieve the roomId and only display message of the current room  */ 
    socket.on("joinRoom", (room) => { 
        connection.query(`SELECT * FROM message WHERE roomId=${room} ORDER BY date DESC LIMIT 10`, function(err, results, rows) {
        io.in(`${room}`).emit("sendMsg", results)
      })
    })

   /* Send number of user in a given room */
    socket.on('retrieveNumClient', (room) => {
      socket.room = room; 
      socket.join(`${room}`);
      (typeof  numClients[room]  === 'undefined') ? numClients[room] = 1 :    numClients[room]++;
        io.to(`${room}`).emit("getNumOfClient", numClients)
    })

    /* Direct messages send into DB in real time */
    socket.on("sendMessage", ({user, message, date, room}) => {
      if(message === "") {
          return 'No empty messages allowed'
      } else {
        connection.query(`INSERT INTO message(content,userId,username,date,roomId) 
        VALUES("${message}","${socket.id}","${user}","${date}", "${room}")`)
      }    
    })

    socket.on('disconnect', () => {
      numClients[socket.room]--;
      io.emit("updateNumber", numClients)
      io.emit("message", "a user has leaved")
    })
  })
}