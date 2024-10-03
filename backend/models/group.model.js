import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  name: String,
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
  ],
  messages: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Message", default: [] },
  ],
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
});

export default mongoose.model("Group", GroupSchema);
