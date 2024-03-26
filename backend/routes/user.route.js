import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  getUsers,
  getCurrentUserInfo,
  getUsersWhoAreExperts,
  getUsersWhoAreNotExperts,
  rateExpert,
  getExpertById,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsers);
// Route to get current user info
router.get("/current-user", protectRoute, getCurrentUserInfo);

// Route to get users who are experts
router.get("/experts", protectRoute, getUsersWhoAreExperts);

router.get("/experts/:id", protectRoute, getExpertById);

router.get("/experts/rate/:id", protectRoute, rateExpert);

// Route to get users who are not experts
router.get("/non-experts", protectRoute, getUsersWhoAreNotExperts);

export default router;
