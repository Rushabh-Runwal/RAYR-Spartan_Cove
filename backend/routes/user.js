const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Get all users (for directory search)
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new user
router.post("/", async (req, res) => {
  const { googleId, name, email, avatar } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ googleId });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    user = new User({
      googleId,
      name,
      email,
      avatar,
    });

    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
