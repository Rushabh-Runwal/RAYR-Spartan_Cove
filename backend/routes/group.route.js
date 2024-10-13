import express from "express";

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

router.route("/").get(getAllGroups).post(createGroup);

router
  .route("/:id")
  .get(getGroup)
  .post(updateGroup)
  .put(updateGroup)
  .delete(deleteGroup);

router
  .route("/:id/messages")
  .get(getMessagesInGroup)
  .post(createMessagesInGroup);

export default router;
