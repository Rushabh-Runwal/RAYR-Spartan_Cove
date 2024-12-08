import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import passport from "passport";
import { Server } from "socket.io";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import messageRoutes from "./routes/message.route.js";
import groupRoutes from "./routes/group.route.js";
import xAIRoutes from "./routes/xai.route.js";
import { connectDB } from "./config/db.js";
import events from "events";

events.EventEmitter.defaultMaxListeners = 15;
dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Server is Ready");
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);
app.use("/group", groupRoutes);
app.use("/xai", xAIRoutes);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
  });
}
