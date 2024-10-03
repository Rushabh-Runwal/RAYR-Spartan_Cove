import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
  content: String, // For text messages
  attachmentUrl: String, // For media/document attachments
  messageType: {
    type: String,
    enum: ["text", "image", "video", "document"],
    default: "text",
  },
  sentAt: { type: Date, default: Date.now },
  deliveredAt: { type: Date, default: null },
  seenAt: { type: Date, default: null }, // could be removed
});

export default mongoose.model("Message", MessageSchema);
