import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        title: String,
        price: Number,
        image: String,
        qty: Number,
      },
    ],

    shippingAddress: {
      name: String,
      pincode: String,
      city: String,
      state: String,
      area: String,
      flat: String,
      country: String,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    // 🔥 NEW FIELD FOR MANUAL UPI
    paymentDetails: {
      name: String,
      transactionId: {
        type: String,
        unique: true, // prevents duplicate UTR
        sparse: true, // allows null initially
      },
      amount: Number,
      screenshot: String, // store image path if uploaded
      submittedAt: Date,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "pending_verification", "paid", "rejected"],
      default: "pending",
    },

    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered"],
      default: "processing",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
