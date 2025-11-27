import { Server } from "socket.io";
import http from "http";
import express from "express";
import colors from "colors";
import dotenv from "dotenv";

dotenv.config();


const app = express();
const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: [
        process.env.FRONTEND_URL
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Map userId → socketId
const userSocketMap = {};

// Helper to get receiver socket id
export const getSocketRecieverId = (receiverId) => userSocketMap[receiverId];

// ---------------- SOCKET EVENTS ----------------//
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

export { io, server, app };
