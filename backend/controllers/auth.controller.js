import { getDB } from "../config/db.js";

export const syncUser = async (req, res) => {
  try {
    const db = getDB();
    const users = db.collection("users");

    const firebaseUser = req.firebaseUser;

    // ✅ Safe extraction
    const uid = firebaseUser?.uid;
    const email = firebaseUser?.email;
    const name = firebaseUser?.name || "";
    const provider = firebaseUser?.firebase?.sign_in_provider || "password";

    // ✅ Handle photo safely
    const photo = firebaseUser?.picture || firebaseUser?.photoURL || "";

    // 🔍 Check existing user
    let user = await users.findOne({ uid });

    if (!user) {
      // 🆕 REGISTER
      const newUser = {
        uid,
        email,
        name,
        photoURL: photo,
        provider,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await users.insertOne(newUser);

      return res.status(200).json({
        success: true,
        user: newUser,
      });
    } else {
      // 🔄 LOGIN (update user)
      await users.updateOne(
        { uid },
        {
          $set: {
            updatedAt: new Date(),
            photoURL: photo || user.photoURL,
          },
        },
      );

      return res.status(200).json({
        success: true,
        user: { ...user, photoURL: photo || user.photoURL },
      });
    }
  } catch (error) {
    console.error("Auth sync error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
