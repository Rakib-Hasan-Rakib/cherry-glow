"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { getAuth } from "firebase/auth";
import Image from "next/image";

const CATEGORIES = ["Skincare", "Makeup", "Haircare", "Bodycare"];
const SECTIONS = ["featured", "new", "best"];

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [image, setImage] = useState(null);


  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    section: "featured",
    stock: "",
  });
    const API = `${process.env.NEXT_PUBLIC_API_URL}/products`;

  const getToken = async () => await getAuth().currentUser.getIdToken();

  const fetchProducts = async () => {
    const res = await fetch(`${API}/allProduct`, {
      headers: { Authorization: `Bearer ${await getToken()}` },
    });
    setProducts(await res.json());
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      category: "",
      section: "featured",
      stock: "",
    });
    setEditingId(null);
  };

 const handleSubmit = async () => {
   const token = await getAuth().currentUser.getIdToken();

   const formData = new FormData();
   formData.append("name", form.name);
   formData.append("price", form.price);
   formData.append("category", form.category);
   formData.append("section", form.section);
   formData.append("stock", form.stock);

   if (image) {
     formData.append("image", image);
   }

   const method = editingId ? "PUT" : "POST";
   const url = editingId ? `${API}/updateProduct/${editingId}` : `${API}/addProduct`;

   await fetch(url, {
     method,
     headers: {
       Authorization: `Bearer ${token}`,
     },
     body: formData,
   });

   setOpen(false);
   setImage(null);
   fetchProducts();
 };


  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      section: product.section,
      stock: product.stock,
    });
    setEditingId(product._id);
    setOpen(true);
  };

  const deleteProduct = async (id) => {
    await fetch(`${API}/deleteProduct/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${await getToken()}` },
    });
    fetchProducts();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Management</h1>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              onClick={resetForm}
              className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg"
            >
              <Plus size={18} />
              Add Product
            </button>
          </Dialog.Trigger>

          {/* Modal */}
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/40" />
            <Dialog.Content className="fixed top-1/2 left-1/2 w-[95%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg">
              <Dialog.Title className="text-xl font-semibold mb-4">
                {editingId ? "Edit Product" : "Add New Product"}
              </Dialog.Title>

              <div className="space-y-3">
                <input
                  placeholder="Product Name"
                  className="input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                  type="number"
                  placeholder="Price"
                  className="input"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />

                {/* Category Dropdown */}
                <select
                  className="input"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                {/* Section Dropdown */}
                <select
                  className="input"
                  value={form.section}
                  onChange={(e) =>
                    setForm({ ...form, section: e.target.value })
                  }
                >
                  {SECTIONS.map((sec) => (
                    <option key={sec} value={sec}>
                      {sec.charAt(0).toUpperCase() + sec.slice(1)}
                    </option>
                  ))}
                </select>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="input"
                />

                <input
                  type="number"
                  placeholder="Stock"
                  className="input"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                />
              </div>

              <div className="mt-5 flex justify-end gap-3">
                <Dialog.Close asChild>
                  <button className="px-4 py-2 border rounded-lg">
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg"
                >
                  {editingId ? "Update" : "Save"}
                </button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr className="text-center">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Photo</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Section</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-t text-center">
                <td className="px-4 py-3">{p.name}</td>
                <td className="px-4 py-3">
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={80}
                    height={30}
                    className="rounded-lg object-cover mx-auto"
                  />
                </td>
                <td className="px-4 py-3">{p.category}</td>
                <td className="px-4 py-3 capitalize">{p.section}</td>
                <td className="px-4 py-3">৳{p.price}</td>
                <td className="px-4 py-3">{p.stock}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="p-2 bg-yellow-400 rounded-lg"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => deleteProduct(p._id)}
                      className="p-2 bg-red-500 text-white rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx global>{`
        .input {
          width: 100%;
          padding: 10px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
