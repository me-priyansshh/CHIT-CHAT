import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import connectDB from "./config/db.js";

// Routes //
import userRouter from "./routes/user.route.js";
import messageRouter from "./routes/message.route.js";
import groupRouter from "./routes/group.route.js";

// Import app & server from socket.js //
import { server, app } from "./Socket/socket.js";
import AiRouter from "./routes/ai.route.js";

dotenv.config();

// ---------------- MIDDLEWARES ----------------//
app.use(
  cors({
    origin: [
        process.env.FRONTEND_URL,
    ],
    credentials: true,
  })
);

app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// ---------------- API ROUTES ----------------
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);
app.use("/api/group", groupRouter);
app.use("/api", AiRouter);

// ---------------- SERVER --------------------//

const PORT = process.env.PORT || 8000;
server.listen(PORT, async () => {
  await connectDB();
  console.log(
    `🚀 Server + Socket running at port ${PORT}`.rainbow.bold
  );
});
