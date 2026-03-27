import admin from "../config/firebaseAdmin.js";
import { getDB } from "../config/db.js";

export const verifyAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 🔒 Check header format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // 🔐 Verify Firebase token
    const decoded = await admin.auth().verifyIdToken(token);

    // 🗄️ Get user from DB
    const db = getDB();
    const user = await db.collection("users").findOne({ uid: decoded.uid });

    // 🚫 Check admin role
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied (Admin only)" });
    }

    // ✅ Attach both Firebase + DB user
    req.firebaseUser = decoded;
    req.user = user;

    next();
  } catch (error) {
    console.error("Verify admin error:", error.message);

    res.status(401).json({
      message: "Unauthorized",
    });
  }
};
