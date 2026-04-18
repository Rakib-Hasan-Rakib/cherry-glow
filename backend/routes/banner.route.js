import express from "express";
import { getDB } from "../config/db.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/promo-banner", async (req, res) => {
  const db = getDB();

  const banner = await db.collection("promo_banner").find().toArray();

  res.send(banner);
});

router.post("/promo-banner", async (req, res) => {
  const db = getDB();

  const banner = {
    ...req.body,
    isActive: true,
  };
  const result = await db.collection("promo_banner").insertOne(banner);
  res.send(result);
});


router.patch("/promo-banner/toggle/:id", async (req, res) => {
  try {
    const db = getDB();
    const { isActive } = req.body;
    const { id } = req.params;

    const query = id.length === 24 ? { _id: new ObjectId(id) } : { _id: id };

    const result = await db.collection("promo_banner").updateOne(query, {
      $set: { isActive },
    });

    if (result.matchedCount === 0) {
      return res.status(404).send({ error: "Banner not found" });
    }

    res.send({ success: true });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


router.delete("/promo-banner/:id", async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;

    const query = id.length === 24 ? { _id: new ObjectId(id) } : { _id: id };

    const result = await db.collection("promo_banner").deleteOne(query);

    if (result.deletedCount === 0) {
      return res.status(404).send({ error: "Banner not found" });
    }

    res.send({ success: true });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

export default router;
