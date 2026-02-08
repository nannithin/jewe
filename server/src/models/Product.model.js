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
      type: String, // Emerald, Diamond, Ruby
    },

    material: {
      type: String, // Gold, Silver, Platinum
    },

    // Size / Variants
    sizes: [
      {
        label: String,   // Small, Medium, Large or 16in, 18in
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

    // Images
    images: [
      {
        url: String,
        publicId: String,
      },
    ],

    // Extra info (your "additional info" section)
    additionalInfo: {
      type: String,
    },

    // SEO friendly
    slug: {
      type: String,
      unique: true,
    },

    // Admin reference
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
