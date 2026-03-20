import Product from "../models/prod.js";
import slugify from "slugify";

export const createProduct = async (req, res) => {
  try {
    const { title, price, originalPrice, ...rest } = req.body;

    let baseSlug = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    });

    let slug = baseSlug;
    let count = 1;

    // 🔥 Ensure unique slug
    while (await Product.findOne({ slug })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    const product = await Product.create({
      title,
      slug,
      price,
      originalPrice,
      ...rest,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/products?search=emerald
export const getAllProducts = async (req, res) => {
  try {
    const { search = "", category = "" } = req.query;

    let filter = {};

    // Search by title
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    // Filter by category
    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

