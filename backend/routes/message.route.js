import express from "express";

import {
  createMessage,
  getAllMessages,
  updateMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/", getAllMessages);
router.post("/", createMessage);
router.put("/:id", updateMessage);
// router.delete("/:id", deleteMessage);

export default router;
