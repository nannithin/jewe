import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // Basic Info
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    // Pricing
    price: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "USD",
    },

    // Availability
    inStock: {
      type: Boolean,
      default: true,
    },

    stockQuantity: {
      type: Number,
      default: 0,
    },

    // Jewellery specific
    category: {
      type: String,
      enum: ["pendant", "ring", "earring", "necklace", "bracelet"],
      required: true,
    },

    gemstone: {
      type: String,
    },

    material: {
      type: String,
    },

    // Size / Variants
    sizes: [
      {
        label: String,
        available: {
          type: Boolean,
          default: true,
        },
      },
    ],

    adjustableChain: {
      type: Boolean,
      default: false,
    },

    // ✅ Single Image (Supabase URL)
    image: {
      type: String,
      required: true,
    },

    additionalInfo: {
      type: String,
    },

    slug: {
      type: String,
      unique: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);