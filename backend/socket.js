


module.exports = function(io) {
  io.on("connection", (socket) => {

    // à la connexion j'envois un event sendMessage prenant un parametre msg
    socket.on("sendMessage", (msg) => {
      io.emit("message", msg)
    })
    socket.on('disconnect', () => {
      io.emit("message", "a user has leaved")
    })
  })
}