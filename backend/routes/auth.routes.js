import express from "express";
import verifyFirebaseToken from "../middlewares/verifyFirebaseToken.js";
import { syncUser } from "../controllers/auth.controller.js";

const router = express.Router();

// Handles BOTH login & register
router.post("/sync", verifyFirebaseToken, syncUser);

export default router;
