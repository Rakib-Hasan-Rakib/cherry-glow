import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // ✅ Validate role
    if (!role || !["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const db = getDB();

    // 🔥 Convert id → ObjectId
    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          role,
          updatedAt: new Date(),
        },
      },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Role updated",
    });
  } catch (error) {
    console.error("Update role error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
