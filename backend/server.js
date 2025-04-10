const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.js");
const roomRoutes = require("./routes/rooms.js");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
  },
});

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);

// MongoDB
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB",error.message);
    }
}
// Socket.io
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", ({ roomId, username }) => {
    socket.join(roomId);
    console.log(`${username} liittyi huoneeseen ${roomId}`);
    socket.to(roomId).emit("chat-message", {
      username: "System",
      message: `${username} liittyi huoneeseen`,
    });
  });

  socket.on("send-message", ({ roomId, message, username }) => {
    console.log(`${username} huoneessa ${roomId}: ${message}`);
    io.to(roomId).emit("chat-message", { username, message });
  });

  socket.on("disconnect", () => {
    console.log(`Käyttäjä (${socket.id}) katkaisi yhteyden`);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`)
});
