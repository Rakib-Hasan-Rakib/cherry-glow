import { getDB } from "../config/db.js";

export const syncUser = async (req, res) => {
  try {
    const db = getDB();
    const users = db.collection("users");

    const photo = req.firebaseUser.photoURL || req.firebaseUser.picture || "";

    const { uid, email, name, firebase } = req.firebaseUser;

    // Check if user exists
    let user = await users.findOne({ uid });

    if (!user) {
      // REGISTER (first time login)
      user = {
        uid,
        email,
        name: name || "",
        photoURL: photo,
        provider: firebase?.sign_in_provider || "password",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await users.insertOne(user);
    } else {
      // LOGIN (update last seen)
      await users.updateOne(
        { uid },
        {
          $set: {
            updatedAt: new Date(),
            photoURL: picture || user.photoURL,
          },
        }
      );
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Auth sync error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
