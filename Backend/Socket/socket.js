// Socket/socket.js
import { Server } from "socket.io";
import http from "http";
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

// ---------------- EXPRESS APP & HTTP SERVER ----------------
const app = express();
const server = http.createServer(app);

// ---------------- SOCKET.IO ----------------
const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND_URL, "https://chit-chat-1-b2yb.onrender.com"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Map userId → socketId
const userSocketMap = {};

// Helper to get receiver socket id
export const getSocketRecieverId = (recieverId) => userSocketMap[recieverId];

// ---------------- SOCKET EVENTS ----------------
io.on("connection", (socket) => {
  console.log(`Connected To Socket: ${socket.id}`.cyan);

  const userId = socket.handshake.query.userId;

  if (userId) userSocketMap[userId] = socket.id;

  // Broadcast online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Join user groups
  socket.on("joinUserGroups", (groupIds) => {
    if (Array.isArray(groupIds)) {
      groupIds.forEach((groupId) => socket.join(groupId));
    }
  });

  // Leave a group
  socket.on("leaveGroup", (groupId) => socket.leave(groupId));

  // Disconnect
  socket.on("disconnect", () => {
    console.log(`Disconnected From Socket: ${socket.id}`.yellow);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// ---------------- SERVE FRONTEND ----------------
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "dist")));
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// ---------------- EXPORT ----------------
export { io, server, app };
