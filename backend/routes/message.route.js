import express from "express";
import protect from "../middleware/auth.js";
import {
  createMessage,
  getAllMessages,
  updateMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.route("/").get(protect, getAllMessages).post(protect, createMessage);
router.route("/:id").put(protect, updateMessage);
// router.delete("/:id", deleteMessage);

export default router;
