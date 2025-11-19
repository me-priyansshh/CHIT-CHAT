// socket.js
import { Server } from "socket.io";
import http from "http";
import express from "express";
import colors from "colors";
import dotenv from "dotenv";

dotenv.config();

// Express app
const app = express();

// HTTP server
const server = http.createServer(app);

// Socket.IO server
const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND_URL, "https://chit-chat-1-b2yb.onrender.com"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Map userId → socketId
const userSocketMap = {};

// Helper function to get receiver's socket id
export const getSocketRecieverId = (recieverId) => {
  return userSocketMap[recieverId];
};

// SOCKET CONNECTION
io.on("connection", (socket) => {
  console.log(`Connected To Socket: ${socket.id}`.cyan);

  const userId = socket.handshake.query.userId;

  // Store mapping
  if (userId !== undefined && userId !== null) {
    userSocketMap[userId] = socket.id;
  }

  // Broadcast online users list
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // JOIN ALL USER GROUPS
  socket.on("joinUserGroups", (groupIds) => {
    if (Array.isArray(groupIds)) {
      groupIds.forEach((groupId) => {
        socket.join(groupId);
      });
    }
  });

  // LEAVE SPECIFIC GROUP
  socket.on("leaveGroup", (groupId) => {
    socket.leave(groupId);
  });

  // DISCONNECT
  socket.on("disconnect", () => {
    console.log(`Disconnected From Socket: ${socket.id}`.yellow);

    delete userSocketMap[userId];

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Export everything
export { io, server, app };
