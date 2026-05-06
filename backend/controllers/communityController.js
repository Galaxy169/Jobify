import { getPosts } from "../models/communityModel.js";

export const getCommunityPosts = async (req, res) => {
  try {
    let limit = 5;

    if (req.subscription_type === "premium") {
      limit = null;
    }

    const posts = await getPosts(limit);

    res.json({
      message: "Community posts fetched",
      data: posts,
    });
  } catch (err) {
    console.error("Community error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
