"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { toast } from "sonner";

import OrdersMobile from "@/components/admin/OrdersMobile";
import OrdersTable from "@/components/admin/OrdersTable";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = `${process.env.NEXT_PUBLIC_API_URL}/orders`;
  const STATUS = ["pending", "processing", "shipped", "delivered", "cancelled"];
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
    processing: "bg-blue-100 text-blue-700 border-blue-300",
    shipped: "bg-purple-100 text-purple-700 border-purple-300",
    delivered: "bg-green-100 text-green-700 border-green-300",
    cancelled: "bg-red-100 text-red-700 border-red-300",
  };

  /* ---------------- Get Firebase Token ---------------- */
  const getToken = async () => {
    const user = getAuth().currentUser;
    if (!user) return null;
    return await user.getIdToken();
  };

  /* ---------------- Fetch Orders ---------------- */
  const fetchOrders = async () => {
    try {
      setLoading(true);

      const token = await getToken();

      const res = await axios.get(`${API}/allOrders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ---------------- Update Status ---------------- */
  const updateStatus = async (id, status) => {
    try {
      const token = await getToken();

      await axios.patch(
        `${API}/updateStatus/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Status updated");

      // Optimistic update (faster UI)
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status } : o)),
      );
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold">Orders ({orders.length})</h1>

      {/* Mobile View */}
      <div className="block md:hidden">
        <OrdersMobile
          orders={orders}
          loading={loading}
          onUpdateStatus={updateStatus}
          status={STATUS}
          statusStyles={statusStyles}
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <OrdersTable
          orders={orders}
          loading={loading}
          onUpdateStatus={updateStatus}
          status={STATUS}
          statusStyles={statusStyles}
        />
      </div>
    </div>
  );
}
