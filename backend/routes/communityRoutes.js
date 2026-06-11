import express from "express";
import { getCommunityPosts } from "../controllers/communityController.js";
import { subscriptionMiddleware } from "../middleware/subscriptionMiddleware.js";
import { optionalAuthMiddleware } from "../middleware/optionalAuthMiddleware.js";

const router = express.Router();

// PUBLIC route
router.get("/", optionalAuthMiddleware, subscriptionMiddleware, getCommunityPosts);

export default router;
