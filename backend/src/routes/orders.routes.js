import express from "express";
import nodemailer from "nodemailer";
import { getDB } from "../config/db.js";

const router = express.Router();

router.post("/order", async (req, res) => {
  const db = getDB();
  try {
    const { name, address, phone, cart } = req.body;

    // Basic validation
    if (!name || !address || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid order data",
      });
    }

    // Save order to MongoDB
    const result = await db.collection("orders").insertOne({
      name,
      address,
      phone,
      cart,
      createdAt: new Date(),
    });

    if (!result.insertedId) {
      return res.status(500).json({
        success: false,
        message: "Failed to save order",
      });
    }

    // Send email to admin
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Cherry Glow" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "New Order Received",
      html: `
        <h2>New Order</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <h3>Cart Items</h3>
        <pre>${JSON.stringify(cart, null, 2)}</pre>
      `,
    });

    // ✅ Only here success is returned
    return res.status(200).json({
      success: true,
      message: "Order confirmed",
    });
  } catch (error) {
    console.error("Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Order failed",
    });
  }
});

export default router;
