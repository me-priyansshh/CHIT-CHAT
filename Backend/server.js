import colors from 'colors';
import connectDB from './config/db.js';
import morgan from 'morgan';
import userRouter from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import messageRouter from './routes/message.route.js';
import cors from 'cors';
import { server, app } from './Socket/socket.js'; // <-- import same app here
import express from 'express';
import dotenv from 'dotenv';
import groupRouter from './routes/group.route.js';
dotenv.config();

// ✅ Middlewares must be added to the same app that socket uses
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// ✅ Routes (now registered on the same app)
app.use('/api/user', userRouter);
app.use('/api/message', messageRouter);
app.use('/api/group', groupRouter);

// ✅ Port and server startup
const port = process.env.PORT || 8000;
server.listen(port, () => {
  connectDB();
  console.log(`🚀 Server and Socket running at http://localhost:${port}`.rainbow.bold);
});
