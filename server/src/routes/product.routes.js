import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductBySlug,
} from "../controllers/product.controller.js";
import { protect } from "../middleware.js";

const router = express.Router();

// Create product
router.post("/", createProduct);

// Get all products
router.get("/", getAllProducts);

router.get("/dashboard", protect, (req, res) => {
  res.json({
    message: "Welcome to dashboard",
    user: req.user,
  })
})

// Get product detail page
router.get("/:slug", getProductBySlug);




export default router;
