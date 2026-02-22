import express from "express";
import { protect } from "../middleware.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

const router = express.Router();

router.post("/create", protect, async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;
    const formattedItems = [];
    const productsToUpdate = [];

    // 🔥 Step 1 — Validate everything first
    for (const item of items) {
      const product = await Product.findById(item._id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.stockQuantity < item.qty) {
        return res.status(400).json({ message: `${product.title} is out of stock` });
      }

      totalAmount += product.price * item.qty;

      formattedItems.push({
        productId: product._id,
        title: product.title,
        price: product.price,
        image: product.image,
        qty: item.qty,
      });

      productsToUpdate.push({
        product,
        qty: item.qty,
      });
    }

    // 🔥 Step 2 — Reduce stock safely
    for (const item of productsToUpdate) {
      item.product.stockQuantity -= item.qty;
      await item.product.save();
    }
    console.log("Formatted Items:", formattedItems);

    // 🔥 Step 3 — Create order
    const newOrder = await Order.create({
      user: req.user.id,
      items: formattedItems,
      shippingAddress,
      totalAmount,
    });

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get('/userorders', protect, async (req, res) => {
  console.log(req.user.id);
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    return res.json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
})



router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // ensure user owns order
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json({ order });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/submit-payment/:id", async (req, res) => {
  const { name, transactionId, amount } = req.body;

  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  // prevent resubmitting
  if (order.paymentStatus !== "pending") {
    return res.status(400).json({ message: "Payment already submitted" });
  }

  order.paymentDetails = {
    name,
    transactionId,
    amount,
    submittedAt: new Date(),
  };

  order.paymentStatus = "pending_verification";

  await order.save();

  res.json({ message: "Payment submitted successfully" });
});


// Approve

router.put("/admin/approve/:id", protect, async (req, res) => {
  try {
    // 🔐 Ensure admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.paymentStatus !== "pending_verification") {
      return res.status(400).json({ message: "Invalid payment state" });
    }

    // 🔥 Reduce stock here (safer location)
    for (const item of order.items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.stockQuantity < item.qty) {
        return res.status(400).json({
          message: `${product.title} is out of stock`,
        });
      }

      product.stockQuantity -= item.qty;
      await product.save();
    }

    order.paymentStatus = "paid";
    order.orderStatus = "processing";

    await order.save();

    res.json({ message: "Payment approved & stock updated" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Reject
router.put("/admin/reject/:id", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.paymentStatus !== "pending_verification") {
      return res.status(400).json({ message: "Invalid payment state" });
    }

    order.paymentStatus = "rejected";

    await order.save();

    res.json({ message: "Payment rejected" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// GET pending verification orders
router.get("/admin/pending-payments", async (req, res) => {
  const orders = await Order.find({
    paymentStatus: "pending_verification",
  }).sort({ createdAt: -1 });

  res.json({ orders });
});




export default router;