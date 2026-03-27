import express from "express";
import { getDB } from "../config/db.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { updateUserRole } from "../controllers/updateUserRole.js";

const router = express.Router();

router.get("/check", verifyAdmin, (req, res) => {
  res.json({ ok: true });
});


router.get("/users", verifyAdmin, async (req, res) => {
  const db = getDB();
  const users = await db.collection("users").find().toArray();
  res.json(users);
});
router.put("/users/:id", verifyAdmin, updateUserRole);


export default router;
