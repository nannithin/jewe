import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductBySlug,
} from "../controllers/product.controller.js";
import { protect } from "../middleware.js";
import Product from "../models/prod.js";

const router = express.Router();

// Create product
router.post("/", createProduct);

// Get all products
router.get("/", getAllProducts);

// GET /products/related/:id
router.get("/related/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const related = await Product.find({
      _id: { $ne: product._id }, // exclude current
      category: product.category,
    }).limit(6);

    res.json({ products: related });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/dashboard", protect, (req, res) => {
  res.json({
    message: "Welcome to dashboard",
    user: req.user,
  })
})

// Get product detail page
router.get("/:slug", getProductBySlug);




export default router;
