import {Server} from 'socket.io';
import http from 'http';
import express from 'express';
import colors from 'colors';

//Rest object for express => top of layer of our express server
const app = express();

//Create Server For http thats like another server which pipelines two users
const server = http.createServer(app);

//this is socket and it will also handle cors policy
const io = new Server(server, {
        cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],
        credentials: true,
    }
});

    export const getSocketRecieverId = (recieverId) => {
        return userSocketMap[recieverId];
    }

    const userSocketMap = {}; // {userId => socketId}

//Now as socket => io so we will handle socket requests via io
io.on('connection', (socket) => {

    console.log(`Connected To Socket: ${socket.id}`.rainbow);
    
    const userId = socket.handshake.query.userId;

    if(userId !== undefined && userId !== null){
        userSocketMap[userId] = socket.id;
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
         console.log(`Disconnected From Socket: ${socket.id}`.rainbow);
         delete userSocketMap[userId];
         io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });

});

export {io, server, app};


