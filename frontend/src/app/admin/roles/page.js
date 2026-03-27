"use client";

import { useEffect, useState } from "react";
import { Shield, User } from "lucide-react";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { toast } from "sonner";

export default function AdminRoles() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");

  const API = `${process.env.NEXT_PUBLIC_API_URL}/admin/users`;

  // 🔐 Get token once
  const getToken = async () => {
    const currentUser = getAuth().currentUser;
    if (!currentUser) throw new Error("Not authenticated");
    return await currentUser.getIdToken();
  };

  // 📦 Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const token = await getToken();

      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to load users");
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔄 Update role
  const updateRole = async (id, role) => {
    try {
      setUpdatingId(id);

      const token = await getToken();

      await axios.put(
        `${API}/${id}`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // ✅ Optimistic update (no refetch needed)
      setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, role } : u)));
      toast.success("Role updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update role");
    } finally {
      setUpdatingId(null);
    }
  };

  // ⏳ Loading UI
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">Loading users...</div>
    );
  }

  // ❌ Error UI
  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin & Roles</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-center">Role</th>
              <th className="px-4 py-3 text-center">Change Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                {/* Email */}
                <td className="px-4 py-3">{user.email}</td>

                {/* Role Badge */}
                <td className="px-4 py-3 text-center">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs
                      ${
                        user.role === "admin"
                          ? "bg-pink-100 text-pink-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {user.role === "admin" ? (
                      <Shield size={14} />
                    ) : (
                      <User size={14} />
                    )}
                    {user.role}
                  </span>
                </td>

                {/* Role Select */}
                <td className="px-4 py-3 text-center">
                  <select
                    value={user.role}
                    disabled={updatingId === user._id}
                    onChange={(e) => updateRole(user._id, e.target.value)}
                    className="px-3 py-2 border rounded-lg disabled:opacity-50"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
