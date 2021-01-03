const express = require("express");
const router = express.Router();
const room = require("../controllers/room");


router.get('/rooms',room.findAll)
router.get('/rooms/:id/messages',room.findAllMessageByRoom)
router.get('/rooms/:id/lastMessages', room.getLastMessages )

module.exports =router; 