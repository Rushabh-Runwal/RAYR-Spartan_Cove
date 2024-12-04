import {
  saveChat,
  getChatHistory,
  getGrokResponse,
} from "../controllers/xaiApi.controller.js";
import express from "express";
import protect from "../middleware/auth.js";

const router = express.Router();

// Route to handle Spartan AI queries
router.route("/").post(protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const userQuery = req.body.query;
    if (!userQuery) {
      return res.status(400).json({ error: "Query is required" });
    }

    const sanitizeQuery = (query) => {
      return query.replace(/[^a-zA-Z0-9\s]/g, "").trim();
    };

    const sanitizedQuery = sanitizeQuery(userQuery);

    // Set the response headers for streaming
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    let completeResponse = "";
    // Handle the streaming response
    await getGrokResponse(userId, sanitizedQuery, (data) => {
      if (data.choices && data.choices[0]?.delta?.content) {
        res.write(data.choices[0]?.delta?.content); // Write chunks to the response
        completeResponse += data.choices[0]?.delta?.content;
      }
    });
    // Save the chat to the database
    await saveChat(userId, "user", sanitizedQuery);
    await saveChat(userId, "system", completeResponse);
    // Signal the end of the streaming response
    res.end();
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your query." });
  }
});

router.route("/getaichat").get(protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const chatHistory = await getChatHistory(userId);
    res.status(200).json(chatHistory);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching chat history." });
  }
});

export default router;
