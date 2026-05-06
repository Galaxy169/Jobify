import express from "express";
import { fetchResume, saveResume } from "../controllers/resumeController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, fetchResume);
router.post("/", authMiddleware, saveResume);

export default router;
