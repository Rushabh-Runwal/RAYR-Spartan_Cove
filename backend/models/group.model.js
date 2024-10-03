import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  name: String,
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
});

export default mongoose.model("Chat", GroupSchema);
