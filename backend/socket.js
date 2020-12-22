


module.exports = function(io) {
  io.on("connection", () => {
    console.log("Hello, I'm connected to socket")
  })

}