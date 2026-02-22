import express from "express";
import { protect } from "../middleware.js";
import Order from "../models/order.model.js";

const router = express.Router();

router.post("/create", protect, async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const newOrder = await Order.create({
      user: req.user.id, // from JWT
      items,
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
router.put("/admin/approve/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) return res.status(404).json({ message: "Order not found" });

  order.paymentStatus = "paid";
  order.orderStatus = "processing";

  await order.save();

  res.json({ message: "Payment approved" });
});

// Reject
router.put("/admin/reject/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);

  order.paymentStatus = "rejected";
  await order.save();

  res.json({ message: "Payment rejected" });
});


// GET pending verification orders
router.get("/admin/pending-payments", async (req, res) => {
  const orders = await Order.find({
    paymentStatus: "pending_verification",
  }).sort({ createdAt: -1 });

  res.json({ orders });
});




export default router;