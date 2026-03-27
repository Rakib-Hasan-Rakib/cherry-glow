import express from "express";
import verifyFirebaseToken from "../middlewares/verifyFirebaseToken.js";
import { syncUser } from "../controllers/auth.controller.js";
import { getDB } from "../config/db.js";

const router = express.Router();

// Handles BOTH login & register
router.post("/sync", verifyFirebaseToken, syncUser);

router.get("/me", verifyFirebaseToken, async (req, res) => {
  const db = getDB();
  const user = await db.collection("users").findOne({
    uid: req.firebaseUser.uid,
  });

  res.send({ user });
});

export default router;
