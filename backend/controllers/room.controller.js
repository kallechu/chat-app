const Room = require("../models/Room.js")

// Get all rooms
const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (err) {
        res.status(400).json({ error: 'Could not fetch rooms' });
    }
};

// Create a new room
const createRoom = async (req, res) => {
    console.log("REQ USER:", req.user);
    console.log("CREATE ROOM BODY:", req.body);
    const { name } = req.body;
  
    try {
      const newRoom = new Room({ name, createdBy: req.user._id });
      await newRoom.save();
      res.status(201).json(newRoom);
    } catch (err) {
      res.status(400).json({ error: 'Could not create room' });
    }
  };

// Get users room by users id
const getUserRooms = async (req, res) => {
    try {
      const userId = req.user._id;
      const rooms = await Room.find({ createdBy: userId });
      res.status(200).json(rooms);
    } catch (error) {
      console.log("Error fetching user rooms:", error.message);
      res.status(500).json({ error: "Something went wrong" });
    }
  };

// Delete a room
const deleteRoom = async (req, res) => {
    const { roomId } = req.params;
    
    try {
        await Room.findByIdAndDelete(roomId);
        res.status(200).json({ message: 'Room deleted' });
    } catch (err) {
        res.status(400).json({ error: 'Could not delete room' });
    }
};

// Update room name
const updateRoom = async (req, res) => {
    const { roomId } = req.params;
    const { name } = req.body;

    try {
        const updatedRoom = await Room.findByIdAndUpdate(roomId, { name }, { new: true });
        res.status(200).json(updatedRoom);
    } catch (err) {
        res.status(400).json({ error: 'Could not update room' });
    }
};

const getRoomById = async (req, res) => {
    const { roomId } = req.params;
  
    try {
      const room = await Room.findById(roomId);
      
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }
  
      res.status(200).json(room);
    } catch (err) {
      res.status(400).json({ error: 'Could not fetch room details' });
    }
  };


module.exports = { getAllRooms, createRoom, getUserRooms, updateRoom, deleteRoom, getRoomById };
