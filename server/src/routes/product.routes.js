import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductBySlug,
} from "../controllers/product.controller.js";

const router = express.Router();

// Create product
router.post("/", createProduct);

// Get all products
router.get("/", getAllProducts);

// Get product detail page
router.get("/:slug", getProductBySlug);

export default router;
