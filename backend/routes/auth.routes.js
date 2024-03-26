import express from "express";
import {
  signup,
  login,
  logout,
  followUser,
  getMyInfo,
  updateUser,
  createExpert,
} from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);
router.put("/update", protectRoute, updateUser);

router.post("/follow/:id", protectRoute, followUser);
router.get("/me", protectRoute, getMyInfo);
router.post("/create-expert/", protectRoute, createExpert);

export default router;
