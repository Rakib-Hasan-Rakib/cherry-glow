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

  const getToken = async () => {
    const user = getAuth().currentUser;
    return user.getIdToken();
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const token = await getToken();

      const res = await axios.get(`${API}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (err) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = await getToken();

      await axios.patch(
        `${API}/update-status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Status updated");
      fetchOrders();
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">Orders ({orders.length})</h1>

      <OrdersMobile
        orders={orders}
        loading={loading}
        onUpdateStatus={updateStatus}
      />

      <OrdersTable
        orders={orders}
        loading={loading}
        onUpdateStatus={updateStatus}
      />
    </div>
  );
}
