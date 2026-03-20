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

router.get("/admin/:id", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get product detail page
router.get("/:slug", getProductBySlug);

router.delete("/admin/:id", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/admin/:id", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ product: updated });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;
