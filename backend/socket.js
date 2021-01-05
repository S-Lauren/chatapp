
const connection = require("./models/db")


module.exports = function(io) {

  io.on("connection", (socket) => {

    /* Send existing room from db */
      connection.query(`SELECT * FROM room`, function(err, results, rows) {
        socket.emit("sendRoom", results)
     })

    /* Event joinRoom for retrieve the roomId and only display message of the current room  */ 

    socket.on("joinRoom", (room) => {
        socket.join(`${room}`);
        connection.query(`SELECT * FROM message WHERE roomId=${room} ORDER BY date DESC LIMIT 10`, function(err, results, rows) {
        io.in(`${room}`).emit("sendMsg", results)
      })
    })

    /* Direct messages send into DB in real time */
    socket.on("sendMessage", ({user, message, date, room}) => {
      connection.query(`INSERT INTO message(content,userId,username,date,roomId) 
       VALUES("${message}","${socket.id}","${user}","${date}", "${room}")`)
    })

    socket.on('disconnect', () => {
      io.emit("message", "a user has leaved")
    })
  })
}