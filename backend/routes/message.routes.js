import express from "express";
import {
  getMessages,
  sendMessage,
  getChats,
} from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// Route to fetch chats (should be defined before the route with the :id parameter)
router.get("/chats", protectRoute, getChats);

// Routes for fetching messages and sending messages
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
