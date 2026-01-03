import express from "express";
import { getDB } from "../config/db.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { ObjectId } from "mongodb";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";
import upload from "../middlewares/upload.js";

const router = express.Router();

/* CREATE PRODUCT */
router.post("/addProduct", verifyAdmin, upload.single("image"), async (req, res) => {
  try {
    const db = getDB();

    let imageUrl = "";
    let public_id = "";

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString(
          "base64"
        )}`,
        { folder: "cherry-glow/products", format: "jpg" }
      );

      imageUrl = uploadResult.secure_url;
      public_id = uploadResult.public_id;
    }

    const product = {
      name: req.body.name,
      price: Number(req.body.price),
      category: req.body.category,
      section: req.body.section,
      stock: Number(req.body.stock),
      image: imageUrl,
      imagePublicId: public_id,
      createdAt: new Date(),
    };

    const result = await db.collection("products").insertOne(product);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Product creation failed" });
  }
});


/* READ ALL PRODUCTS */
router.get("/allProduct", verifyAdmin, async (req, res) => {
  const db = getDB();
  const products = await db.collection("products").find().toArray();
  res.json(products);
});

/* UPDATE PRODUCT */
router.put("/updateProduct/:id", verifyAdmin, upload.single("image"), async (req, res) => {
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
          "base64"
        )}`,
        { folder: "cherry-glow/products", format: "jpg" }
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
});

/* DELETE PRODUCT */
router.delete("/deleteProduct/:id", verifyAdmin, async (req, res) => {
  const db = getDB();
  const { id } = req.params;

  const product = await db.collection("products").findOne({ _id: new ObjectId(id) });

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

    const products = await db
      .collection("products")
      .find(
        {},
        {
          projection: {
            name: 1,
            price: 1,
            category: 1,
            image: 1,
            section: 1,
            stock: 1,
          },
        }
      )
      .sort({ createdAt: -1 })
      .toArray();

    res.json(products);
  } catch (error) {
    console.error("Public products error:", error);
    res.status(500).json({ message: "Failed to load products" });
  }
});

// GET featured products (public)
router.get("/products/featured", async (req, res) => {
  const db = getDB();
  const products = await db
    .collection("products")
    .find({ section: "featured" })
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