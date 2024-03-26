import express from "express";
import {
  createProduct,
  getProductsByBusiness,
  getProducts,
  getProductById
} from "../controllers/product.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", protectRoute, createProduct);
router.get("/:id", protectRoute, getProductsByBusiness);
router.get("/get-product/:id", getProductById);

// protectRoute


export default router;
