  
const Room = require("../models/room"); 

exports.findAll = async (req, res) => {
  try {
    // waiting the response from sql request
    const [allrooms] = await Room.getAll();
    // send status 200 if all good
    res.status(200).json(allrooms)
  } catch(err) {
    if(err) {
      res.status(400)
    }
  }
}
exports.findAllMessageByRoom = async (req, res) => {
  try {
    const roomID = await Room.allMessageFromRoom(req.params.id);
    res.status(201).json(roomID)
  } catch(err) {
    if(err) {
      res.status(400)
    }
  }
}

exports.getLastMessages = async (req, res) => {
  try {
    const roomById = await Room.lastMessages(req.params.id);
    res.status(201).json(roomById)
  } catch(err) {
    if(err) {
      res.status(400)
    }
  }
}