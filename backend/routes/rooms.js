const express = require("express");
const {
  getAllRooms,
  createRoom,
  getUserRooms,
  deleteRoom,
  updateRoom,
  getRoomById,
} = require("../controllers/room.controller.js");
const protectRoute = require("../middleware/protectRoute.js");

const router = express.Router();

// Get all rooms
router.get("/", protectRoute, getAllRooms);

// Create a new room
router.post("/", protectRoute, createRoom);

// Get users rooms
router.get('/user-rooms', protectRoute, getUserRooms); 

// Delete room
router.delete('/:roomId', protectRoute, deleteRoom);

// Update room
router.put('/:roomId', protectRoute, updateRoom);

// Get room details by ID
router.get('/:roomId', protectRoute, getRoomById);


module.exports = router
