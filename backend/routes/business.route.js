import express from "express";
import {
  getBusinesses,
  getBusinessByOwner,
  createBusiness,
  //   updateBusiness,
  //   deleteBusiness,
} from "../controllers/business.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getBusinesses);
router.get("/:id", protectRoute, getBusinessByOwner);
// router.put("/:id", protectRoute, updateBusiness);
// router.delete("/:id", protectRoute, deleteBusiness);
router.post("/", protectRoute, createBusiness);

export default router;
