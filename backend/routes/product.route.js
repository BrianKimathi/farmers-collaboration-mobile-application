import express from "express";
import {
  createProduct,
  getProductsByBusiness,
  getProducts,
} from "../controllers/product.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", protectRoute, createProduct);
router.get("/:id", protectRoute, getProductsByBusiness);

export default router;
