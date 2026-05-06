import express from "express";
import {
  addJob,
  getJobs,
  editJob,
  removeJob,
} from "../controllers/jobController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getJobs);
router.post("/", authMiddleware, addJob);
router.put("/:id", authMiddleware, editJob);
router.delete("/:id", authMiddleware, removeJob);

export default router;
