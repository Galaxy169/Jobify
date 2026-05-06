import express from "express";
import { getCommunityPosts } from "../controllers/communityController.js";
import { subscriptionMiddleware } from "../middleware/subscriptionMiddleware.js";

const router = express.Router();

// PUBLIC route
router.get("/", subscriptionMiddleware, getCommunityPosts);

export default router;
