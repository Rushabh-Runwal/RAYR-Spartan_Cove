import express from "express";
import protect from "../middleware/auth.js";
import {
  getAllGroups,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
  getMessagesInGroup,
  createMessagesInGroup,
} from "../controllers/group.controller.js";

const router = express.Router();

router.route("/").get(protect, getAllGroups).post(protect, createGroup);

router
  .route("/:id")
  .get(protect, getGroup)
  .post(protect, updateGroup)
  .put(protect, updateGroup)
  .delete(protect, deleteGroup);

router
  .route("/:id/messages")
  .get(protect, getMessagesInGroup)
  .post(protect, createMessagesInGroup);

export default router;
