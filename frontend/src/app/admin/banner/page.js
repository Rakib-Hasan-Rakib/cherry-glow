"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Power, PowerOff, Plus } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function AdminBannerPage() {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [banners, setBanners] = useState([]);

  const API = `${process.env.NEXT_PUBLIC_API_URL}/banners/promo-banner`;

  // Fetch banners
  const fetchBanners = async () => {
    try {
      const res = await axios.get(API);
      setBanners(res.data || []);
    } catch (err) {
      toast.error("Failed to fetch banners");
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Create banner
  const handleAdd = async () => {
    if (!image) return;

    try {
      const response = await axios.post(API, {
        image,
        title,
      });

      setImage("");
      setTitle("");
      fetchBanners();
      if (response?.data?.insertedId) {
        toast.success("Banner added successfully");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add banner");
    }
  };

  // Toggle banner
  const toggleBanner = async (id, current) => {
    try {
      const response = await axios.patch(`${API}/toggle/${id}`, {
        isActive: !current,
      });

      if(response?.data?.success) {
        toast.success(`Banner turned ${!current ? "ON" : "OFF"}`);
      }
      fetchBanners();
    } catch (err) {
      toast.error("Failed to toggle banner");
    }
  };

  // Delete banner
  const deleteBanner = async (id) => {
    try {
      const response = await axios.delete(`${API}/${id}`);
      if(response?.data?.success) {
        toast.success("Banner deleted");
      }
      fetchBanners();
    } catch (err) {
      toast.error("Failed to delete banner");
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Title */}
      <h1 className="text-2xl font-bold">Promo Banner Management</h1>

      {/* Upload Form */}
      <div className="bg-white p-4 rounded-xl shadow space-y-4 max-w-xl">
        <h2 className="font-semibold text-lg">Add New Banner</h2>

        <input
          type="text"
          placeholder="Offer Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <input
          type="text"
          placeholder="Cloudinary Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded"
        >
          <Plus size={16} />
          Add Banner
        </button>
      </div>

      {/* Table */}
      <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
        <h2 className="font-semibold text-lg mb-4">Existing Banners</h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Image</th>
              <th className="p-2">Offer</th>
              <th className="p-2">Status</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {banners.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No banners found
                </td>
              </tr>
            )}

            {banners.map((banner) => (
              <tr key={banner._id} className="border-b hover:bg-gray-50">
                {/* Image */}
                <td className="p-2">
                  <Image
                    src={banner.image}
                    alt="banner"
                    width={80}
                    height={50}
                    className="rounded object-cover"
                  />
                </td>

                {/* Title */}
                <td className="p-2">{banner.title || "—"}</td>

                {/* Status */}
                <td className="p-2">
                  {banner.isActive ? (
                    <span className="text-green-600 font-medium">Active</span>
                  ) : (
                    <span className="text-gray-400">Off</span>
                  )}
                </td>

                {/* Actions */}
                <td className="p-2 flex justify-center gap-3">
                  {/* Toggle */}
                  <button
                    onClick={() => toggleBanner(banner._id, banner.isActive)}
                    className="p-2 rounded bg-gray-100 hover:bg-gray-200"
                  >
                    {banner.isActive ? (
                      <PowerOff size={16} />
                    ) : (
                      <Power size={16} />
                    )}
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => deleteBanner(banner._id)}
                    className="p-2 rounded bg-red-100 hover:bg-red-200 text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
