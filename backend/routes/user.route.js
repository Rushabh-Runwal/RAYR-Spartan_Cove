import express from "express";
import protect from "../middleware/auth.js";

import {
  upsertUser,
  deleteUser,
  getUsers,
  getUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/").get(protect, getUsers).post(upsertUser);
router.route("/:id").get(protect, getUser).delete(protect, deleteUser);

export default router;
