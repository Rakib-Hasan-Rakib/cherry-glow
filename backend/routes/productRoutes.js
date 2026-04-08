import express from "express";
import { getDB } from "../config/db.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { ObjectId } from "mongodb";
import cloudinary from "../config/cloudinary.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

/* CREATE PRODUCT */
router.post(
  "/addProduct",
  verifyAdmin,
  upload.array("images", 10), // multiple images
  async (req, res) => {
    try {
      const db = getDB();

      /* ---------------- Parse Variants ---------------- */
      let variants = [];
      try {
        variants = JSON.parse(req.body.variants || "[]");
      } catch (err) {
        return res.status(400).json({ message: "Invalid variants format" });
      }

      /* ---------------- Upload Images ---------------- */
      let images = [];

      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const uploadResult = await cloudinary.uploader.upload(
            `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
            {
              folder: "cherry-glow/products",
            },
          );

          images.push({
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id,
          });
        }
      }

      /* ---------------- Product Object ---------------- */
      const product = {
        name: req.body.name?.trim(),
        brand: req.body.brand || "",
        category: req.body.category,

        description: req.body.description || "",
        useCase: req.body.useCase || "",

        // 🔥 Variants
        variants: variants.map((v) => ({
          quantity: Number(v.quantity) || null,
          unit: v.unit || "ml",
          price: Number(v.price),
          stock: Number(v.stock) || 0,
        })),

        // 🔥 Discount
        discountType: req.body.discountType || "none", // none | percentage | fixed
        discountValue: Number(req.body.discountValue) || 0,

        // 🔥 Flags
        isFeatured: req.body.isFeatured === "true",
        isBestSelling: req.body.isBestSelling === "true",

        // 🔥 Images
        images,

        createdAt: new Date(),
        updatedAt: new Date(),
      };

      /* ---------------- Validation ---------------- */
      if (!product.name || !product.category) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      if (!product.variants.length) {
        return res
          .status(400)
          .json({ message: "At least one variant required" });
      }

      /* ---------------- Insert ---------------- */
      const result = await db.collection("products").insertOne(product);

      res.status(201).json({
        message: "Product created",
        insertedId: result.insertedId,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Product creation failed" });
    }
  },
);

/* READ ALL PRODUCTS FOR ADMIN */
router.get("/allProduct", async (req, res) => {
  try {
    const db = getDB();
    const { search } = req.query;

    const filter = search ? { name: { $regex: search, $options: "i" } } : {};

    const products = await db
      .collection("products")
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json(products);
  } catch (error) {
    console.error("Fetch Products Error:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

/* UPDATE PRODUCT */
router.put(
  "/updateProduct/:id",
  verifyAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const db = getDB();
      const updateData = {
        name: req.body.name,
        price: Number(req.body.price),
        category: req.body.category,
        section: req.body.section,
        stock: Number(req.body.stock),
      };

      if (req.file) {
        const uploadResult = await cloudinary.uploader.upload(
          `data:${req.file.mimetype};base64,${req.file.buffer.toString(
            "base64",
          )}`,
          { folder: "cherry-glow/products", format: "jpg" },
        );
        updateData.image = uploadResult.secure_url;
      }

      await db
        .collection("products")
        .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updateData });

      res.json({ message: "Product updated" });
    } catch (err) {
      res.status(500).json({ message: "Update failed" });
    }
  },
);

/* DELETE PRODUCT */
router.delete("/deleteProduct/:id", verifyAdmin, async (req, res) => {
  const db = getDB();
  const { id } = req.params;

  const product = await db
    .collection("products")
    .findOne({ _id: new ObjectId(id) });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // 1️⃣ Delete image from Cloudinary
  try {
    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId);
    }
  } catch (err) {
    console.error("Cloudinary delete failed:", err.message);
  }

  // 2️⃣ Delete product from MongoDB
  await db.collection("products").deleteOne({ _id: new ObjectId(id) });

  res.json({ message: "Product deleted successfully" });
});

router.get("/allProduct/public", async (req, res) => {
  try {
    const db = getDB();
    const { search = "", category = "All" } = req.query;

    const query = {};

    // Server-side search (product name)
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // Category filter (do not force NONE)
    if (category !== "All") {
      query.category = category;
    }

    const products = await db
      .collection("products")
      .find(query, {
        projection: {
          name: 1,
          price: 1,
          category: 1,
          image: 1,
          section: 1,
          stock: 1,
          brand: 1,
          quantity: 1,
          quantityUnit: 1,
          description: 1,
          discount: 1,
          useCase: 1,
        },
      })
      .sort({ createdAt: -1 })
      .toArray();

    res.json(products);
  } catch (error) {
    console.error("Public products error:", error);
    res.status(500).json({ message: "Failed to load products" });
  }
});

// GET single product (public)
router.get("/product/:id/public", async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;

    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Product details error:", error);
    res.status(500).json({ message: "Failed to load product" });
  }
});

// GET featured products (public)
router.get("/products/featured", async (req, res) => {
  const db = getDB();
  const products = await db
    .collection("products")
    .find({ section: "featured" })
    .limit(3)
    .sort({ createdAt: -1 })
    .toArray();

  res.json(products);
});

// GET best sellers products (public)
router.get("/products/best", async (req, res) => {
  const db = getDB();
  const products = await db
    .collection("products")
    .find({ section: "best" })
    .toArray();

  res.json(products);
});

export default router;
