import admin from "../config/firebaseAdmin.js";
import { getDB } from "../config/db.js";

export const verifyAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token" });

    const token = authHeader.split(" ")[1];
    const decoded = await admin.auth().verifyIdToken(token);

    const db = getDB();
    const user = await db.collection("users").findOne({ uid: decoded.uid });

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
};
