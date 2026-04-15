import express from "express";
import { getDB } from "../config/db.js";
import { Resend } from "resend";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

// router.post("/order", async (req, res) => {
//   try {
//     const db = getDB();
//     const { name, address, phone, cart } = req.body;

//     // Validation
//     if (
//       !name ||
//       !address ||
//       !phone ||
//       !Array.isArray(cart) ||
//       cart.length === 0
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid order data",
//       });
//     }

//     // 1️⃣ Save order to MongoDB
//     const result = await db.collection("orders").insertOne({
//       name,
//       address,
//       phone,
//       cart,
//       createdAt: new Date(),
//     });

//     if (!result.insertedId) {
//       throw new Error("Order not saved");
//     }

//     // 2️⃣ Prepare email content
//     const price = (item) => item.price * item.quantity;
//     const totalAmount = cart.reduce((sum, item) => sum + price(item), 0);
//     const itemsHtml = cart
//       .map(
//         (item) => `<li>${item.name} × ${item.quantity} — ৳${price(item)}</li>`
//       )
//       .join("");

//     // 3️⃣ Send email via Resend
//     await resend.emails.send({
//       from: "Cherry Glow <onboarding@resend.dev>", // must be verified
//       to: process.env.RESEND_ADMIN_EMAIL,
//       subject: `New Order from ${name}`,
//       html: `
//   <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
    
//     <h2 style="color: #111;">New Order Received</h2>

//     <hr style="margin: 16px 0;" />

//     <h3>Customer Details</h3>
//     <p><strong>Name:</strong> ${name}</p>
//     <p><strong>Phone:</strong> ${phone}</p>
//     <p><strong>Address:</strong> ${address}</p>

//     <hr style="margin: 16px 0;" />

//     <h3>Order Items</h3>
//     <ul style="padding-left: 18px;">
//       ${itemsHtml}
//     </ul>

//     <p><strong>Total Items:</strong> ${cart.length}</p>
//     <p><strong>Total Amount:</strong> ৳${totalAmount}</p>

//     <hr style="margin: 16px 0;" />

//     <p style="font-size: 13px; color: #777;">
//       This order was placed via cherry glow.
//     </p>

//   </div>
// `,
//     });

//     // ✅ Only success after BOTH operations
//     return res.status(200).json({
//       success: true,
//       message: "Order confirmed",
//     });
//   } catch (error) {
//     console.error("Order Error:", error.message);

//     return res.status(500).json({
//       success: false,
//       message: "Order failed",
//     });
//   }
// });

router.post("/createOrder", async (req, res) => {
  try {
    const db = getDB();

    const { user, items, totalAmount, address, phone, name } = req.body;

    /* ---------------- Validation ---------------- */

    if (
      !items ||
      !Array.isArray(items) ||
      items.length === 0 ||
      !phone ||
      !address
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid order data",
      });
    }

    /* ---------------- Prepare Order ---------------- */

    const order = {
      user: {
        uid: user?.uid || null,
        name: name || user?.name || "Guest",
        email: user?.email || "",
      },

      phone,
      address,

      items: items.map((i) => ({
        productId: i.productId,
        productName: i.productName,
        quantity: Number(i.quantity),
        price: Number(i.price),
      })),

      totalAmount: Number(totalAmount),

      status: "pending",

      createdAt: new Date(),
      updatedAt: new Date(),
    };

    /* ---------------- Save Order ---------------- */

    const result = await db.collection("orders").insertOne(order);

    if (!result.insertedId) {
      throw new Error("Order not saved");
    }

    /* ---------------- Email Preparation ---------------- */

    const itemsHtml = order.items
      .map(
        (item) => `
        <li>
          ${item.productName} × ${item.quantity} — ৳${
            item.price * item.quantity
          }
        </li>
      `,
      )
      .join("");

    /* ---------------- Send Email ---------------- */

    try {
      await resend.emails.send({
        from: "Cherry Glow <onboarding@resend.dev>",
        to: process.env.RESEND_ADMIN_EMAIL,
        subject: `New Order from ${order.user.name}`,
        html: `
          <div style="font-family: Arial; max-width: 600px; margin: auto;">

            <h2>New Order Received</h2>
            <hr />

            <h3>Customer Details</h3>
            <p><strong>Name:</strong> ${order.user.name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Address:</strong> ${address}</p>

            <hr />

            <h3>Order Items</h3>
            <ul>${itemsHtml}</ul>

            <p><strong>Total Amount:</strong> ৳${order.totalAmount}</p>

            <hr />

            <p style="font-size:12px;color:#777;">
              Cherry Glow Order System
            </p>

          </div>
        `,
      });
    } catch (emailErr) {
      // ⚠️ DO NOT FAIL ORDER if email fails
      console.error("Email failed:", emailErr.message);
    }

    /* ---------------- Response ---------------- */

    return res.status(201).json({
      success: true,
      message: "Order confirmed",
      orderId: result.insertedId,
    });
  } catch (error) {
    console.error("Order Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Order failed",
    });
  }
});

router.get("/orders", verifyAdmin, async (req, res) => {
  try {
    const db = getDB();

    const orders = await db
      .collection("orders")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

router.patch("/updateStatus/:id", verifyAdmin, async (req, res) => {
  try {
    const db = getDB();
    const { status } = req.body;

    const VALID_STATUS = ["pending", "processing", "shipped", "delivered"];

    if (!VALID_STATUS.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    await db.collection("orders").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      },
    );

    res.json({ message: "Status updated" });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

router.get("/single/:id", verifyAdmin, async (req, res) => {
  try {
    const db = getDB();

    const order = await db.collection("orders").findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch order" });
  }
});

export default router;
