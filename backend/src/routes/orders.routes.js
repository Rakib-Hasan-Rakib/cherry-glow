import express from "express";
import { getDB } from "../config/db.js";
import { Resend } from "resend";

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/order", async (req, res) => {
  try {
    const db = getDB();
    const { name, address, phone, cart } = req.body;

    // Validation
    if (
      !name ||
      !address ||
      !phone ||
      !Array.isArray(cart) ||
      cart.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid order data",
      });
    }

    // 1️⃣ Save order to MongoDB
    const result = await db.collection("orders").insertOne({
      name,
      address,
      phone,
      cart,
      createdAt: new Date(),
    });

    if (!result.insertedId) {
      throw new Error("Order not saved");
    }

    // 2️⃣ Prepare email content
    const itemsHtml = cart
      .map(
        (item) => `<li>${item.name} × ${item.quantity} — ৳${item.price}</li>`
      )
      .join("");

    // 3️⃣ Send email via Resend
    await resend.emails.send({
      from: "Cherry Glow <onboarding@resend.dev>", // must be verified
      to: process.env.RESEND_ADMIN_EMAIL,
      subject: "🛒 New Order Received",
      html: `
        <h2>New Order</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>

        <h3>Order Items</h3>
        <ul>${itemsHtml}</ul>

        <p><strong>Total Items:</strong> ${cart.length}</p>
      `,
    });

    // ✅ Only success after BOTH operations
    return res.status(200).json({
      success: true,
      message: "Order confirmed",
    });
  } catch (error) {
    console.error("Order Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Order failed",
    });
  }
});

export default router;
