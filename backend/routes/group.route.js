import express from "express";

import {
  getAllGroups,
  getGroup,
  createGroup,
  updateGroup,
  getMessagesInGroup,
} from "../controllers/group.controller.js";

const router = express.Router();

router.get("/", getAllGroups);
router.get("/:id", getGroup);
router.get("/:id/messages", getMessagesInGroup);
router.put("/:id", updateGroup);
router.post("/", createGroup);

export default router;
