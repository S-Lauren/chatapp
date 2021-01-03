const query = require("./models/db")
    // à la connexion j'envois un event sendMessage prenant un parametre msg
    // NB: à faire avec les users en passage un objet. 
    // Envoyer également la room ID correspondante pour acceder aux messages d'une room existante. 

module.exports = function(io) {
  io.on("connection", (socket) => {

    console.log("A new user is connected :",socket.id)
 
    socket.on("sendMessage", ({user, message, date, room}) => {
      io.emit("message", {user, message, date, room})
      // appeler la requete d'un controller message... 
       query.query(`INSERT INTO message(content,userId,username,date,roomId) 
       VALUES('${message}','${socket.id}','${user}','${date}', '${room}')`)
    
    })
    socket.on('disconnect', () => {
      io.emit("message", "a user has leaved")
    })
  })
}