"use client";

import { useEffect, useState } from "react";
import { Shield, User } from "lucide-react";
import { getAuth } from "firebase/auth";

export default function AdminRoles() {
  const [users, setUsers] = useState([]);

  const API = `${process.env.NEXT_PUBLIC_API_URL}/admin/users`;

  const getToken = async () => await getAuth().currentUser.getIdToken();

  const fetchUsers = async () => {
    const res = await fetch(API, {
      headers: { Authorization: `Bearer ${await getToken()}` },
    });
    setUsers(await res.json());
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (id, role) => {
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,
      },
      body: JSON.stringify({ role }),
    });
    fetchUsers();
  };

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
                <td className="px-4 py-3">{user.email}</td>

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

                <td className="px-4 py-3 text-center">
                  <select
                    value={user.role}
                    onChange={(e) => updateRole(user._id, e.target.value)}
                    className="px-3 py-2 border rounded-lg"
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
