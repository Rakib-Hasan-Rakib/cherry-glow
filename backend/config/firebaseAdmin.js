import dotenv from "dotenv";
dotenv.config();
import admin from "firebase-admin";

console.log("FIREBASE_PRIVATE_KEY:", process.env.FIREBASE_PRIVATE_KEY);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

export default admin;
