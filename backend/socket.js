
    // à la connexion j'envois un event sendMessage prenant un parametre msg
    // NB: à faire avec les users en passage un objet. 
    // Envoyer également la room ID correspondante pour acceder aux messages d'une room existante. 

module.exports = function(io) {
  io.on("connection", (socket) => {
  // Join event et checking si la room existe en db. 
    socket.on("sendMessage", ({user, message}) => {
      io.emit("message", {user, message})
    })
    socket.on('disconnect', () => {
      io.emit("message", "a user has leaved")
    })
  })
}