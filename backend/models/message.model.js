import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
    content: String, // For text messages
    attachmentUrl: String, // For media/document attachments
    messageType: {
      type: String,
      enum: ["text", "image", "video", "document"],
      default: "text",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Message", MessageSchema);
