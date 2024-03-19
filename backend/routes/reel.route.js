import express from "express";
import {
  createReel,
  getAllReels,
  likeReel,
  dislikeReel,
  commentReel,
} from "../controllers/reel.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createReel);
router.get("/", getAllReels);
router.post("/like/:id", protectRoute, likeReel);
router.post("/dislike/:id", protectRoute, dislikeReel);
router.post("/comment/:id", protectRoute, commentReel);

export default router;
