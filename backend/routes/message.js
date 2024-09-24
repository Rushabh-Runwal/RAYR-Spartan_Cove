const express = require("express");
const Message = require("../models/Message");
const Chat = require("../models/Chat");
const router = express.Router();

// Send a message in a chat
router.post("/", async (req, res) => {
  const { chatId, sender, content } = req.body;
  try {
    const message = new Message({ chat: chatId, sender, content });
    await message.save();

    // Update chat with new message
    await Chat.findByIdAndUpdate(chatId, {
      $push: { messages: message._id },
      $set: { updatedAt: Date.now() },
    });

    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all messages for a chat
router.get("/:chatId", async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId }).populate(
      "sender"
    );
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
