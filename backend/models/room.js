const dbConnect = require("./db");


module.exports =  class Room {

  constructor(id, name) {
    this.id = id; 
    this.name = name; 
  }


  static getAll() {
    return dbConnect.execute("SELECT * FROM room"); 
  }
  /* GET room/1/message ---- All messages from one room */ 
  static allMessageFromRoom(id) {
    return dbConnect.execute("SELECT * FROM message WHERE roomId=?", [id])
  }

  static lastMessages(id) {
    return dbConnect.execute("SELECT * FROM message WHERE roomId=? ORDER BY date ASC LIMIT 10", [id])
  }


}