import mongoose from "mongoose";

const aiChatSchema = new mongoose.Schema({
  userId: { type: String, ref: "User", required: true }, // Reference to the User
  messages: {
    type: [
      {
        role: {
          type: String,
          enum: ["system", "user"],
          required: true,
        },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    default: [
      {
        role: "system",
        content: `You are an AI assistant specializing in San José State University. Using the most recent information from SJSU's official website and other current online resources`,
      },
      {
        role: "user",
        content: `Provide detailed and accurate answers specific to SJSU to the following query: `,
      },
    ],
  },
  createdAt: { type: Date, default: Date.now },
});

const AIChat = mongoose.model("AIChat", aiChatSchema);

export default AIChat;
