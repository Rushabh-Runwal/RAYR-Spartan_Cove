const express = require("express");
const Chat = require("../models/Chat");
const router = express.Router();

// Create a new chat
router.post("/", async (req, res) => {
  const { participants } = req.body;
  try {
    const chat = new Chat({ participants });
    await chat.save();
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all chats for a user
router.get("/:userId", async (req, res) => {
  try {
    const chats = await Chat.find({ participants: req.params.userId }).populate(
      "participants"
    );
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
