import express from "express";
import protect from "../middleware/auth.js";
import {
  createMessage,
  getAllMessages,
  updateMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.route("/").post(protect, createMessage);
router.route("/:id").get(protect, getAllMessages).put(protect, updateMessage);
// router.delete("/:id", deleteMessage);

export default router;
