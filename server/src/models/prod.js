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

    originalPrice: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return value >= this.price;
        },
        message: "Original price must be greater than or equal to price",
      },
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

productSchema.virtual("discountPercentage").get(function () {
  if (!this.originalPrice || this.originalPrice === this.price) return 0;

  return Math.round(
    ((this.originalPrice - this.price) / this.originalPrice) * 100
  );
});

// 🔥 Include virtuals in response
productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

export default mongoose.model("Product", productSchema);