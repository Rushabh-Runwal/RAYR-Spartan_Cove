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

const PORT = process.env.PORT || 2;
const server = app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

const activeUsers = new Map();

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    activeUsers.set(userData._id, socket.id);
    socket.emit("connected");
    io.emit("user online", Array.from(activeUsers.keys()));
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room:", room);
  });

  socket.on("message status", ({ messageId, status }) => {
    socket.broadcast.emit("message status update", { messageId, status });
  });

  socket.on("new message", (messageData) => {
    const group = messageData.chat;

    if (!group.users) return;

    group.users.forEach((user) => {
      if (user._id === messageData.sender._id) return;

      socket.to(user._id).emit("stop typing");
      socket.to(user._id).emit("message received", messageData);
    });
  });

  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });

  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing");
  });

  socket.on("group update", (updatedGroup) => {
    updatedGroup.users.forEach((user) => {
      socket.to(user._id).emit("group updated", updatedGroup);
    });
  });
  // Track unread messages per conversation
  socket.on("mark conversation read", ({ conversationId, userId }) => {
    socket
      .to(conversationId)
      .emit("conversation read", { conversationId, userId });
  });

  // Last message updates
  socket.on("update last message", (conversationData) => {
    const { conversationId, message } = conversationData;
    socket.to(conversationId).emit("last message updated", {
      conversationId,
      message,
    });
  });

  // Enhanced user presence tracking
  socket.on("user presence", ({ userId, status }) => {
    io.emit("user status", { userId, status });
  });

  // Add these inside your existing io.on("connection") handler

  // Group management events
  socket.on("group update", (updatedGroup) => {
    socket.broadcast.to(updatedGroup._id).emit("group updated", updatedGroup);
  });

  socket.on("group deleted", (groupId) => {
    socket.broadcast.to(groupId).emit("group removed", groupId);
  });

  // Enhanced typing indicators for groups
  socket.on("typing", (groupId) => {
    socket.broadcast.to(groupId).emit("typing");
  });

  socket.on("stop typing", (groupId) => {
    socket.broadcast.to(groupId).emit("stop typing");
  });

  // User presence in group
  socket.on("join group", (groupId) => {
    socket.join(groupId);
    const groupMembers = io.sockets.adapter.rooms.get(groupId);
    io.to(groupId).emit("group members", Array.from(groupMembers || []));
  });

  socket.on("disconnect", () => {
    const userId = Array.from(activeUsers.entries()).find(
      ([_, socketId]) => socketId === socket.id
    )?.[0];

    if (userId) {
      activeUsers.delete(userId);
      io.emit("user offline", userId);
      io.emit("user online", Array.from(activeUsers.keys()));
    }
  });
});

export default app;
