"use client";

import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CATEGORIES = ["Skincare", "Makeup", "Haircare", "Bodycare"];
const SECTIONS = ["featured", "new", "best"];

export default function ProductForm({ product, onClose, onSuccess }) {
  const [submitting, setSubmitting] = useState(false);
  const [image, setImage] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    section: "featured",
    stock: "",
  });

  const API = `${process.env.NEXT_PUBLIC_API_URL}/products`;

  /* Prefill form when editing */
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        price: product.price || "",
        category: product.category || "",
        section: product.section || "featured",
        stock: product.stock || "",
      });
    }
  }, [product]);

  const getToken = async () => {
    const user = getAuth().currentUser;
    if (!user) throw new Error("Not authenticated");
    return user.getIdToken();
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.category) {
      toast.error("Name, price, and category are required");
      return;
    }

    try {
      setSubmitting(true);

      const token = await getToken();
      const formData = new FormData();

      Object.entries(form).forEach(([k, v]) => formData.append(k, String(v)));

      if (image) formData.append("image", image);

      const url = product
        ? `${API}/updateProduct/${product._id}`
        : `${API}/addProduct`;

      const method = product ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Save failed");

      toast.success(product ? "Product updated" : "Product added");

      onClose();
      onSuccess();
    } catch (err) {
      toast.error(err.message || "Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Product Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <Input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <Select
        value={form.category}
        onValueChange={(v) => setForm({ ...form, category: v })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {CATEGORIES.map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={form.section}
        onValueChange={(v) => setForm({ ...form, section: v })}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SECTIONS.map((s) => (
            <SelectItem key={s} value={s}>
              {s.toUpperCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="file"
        accept="image/*"
        className="cursor-pointer file:text-sm file:font-medium"
        onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
      />

      <Input
        type="number"
        placeholder="Stock"
        value={form.stock}
        onChange={(e) => setForm({ ...form, stock: e.target.value })}
      />

      <Button className="w-full" onClick={handleSubmit} disabled={submitting}>
        {submitting ? "Saving..." : product ? "Update Product" : "Save Product"}
      </Button>
    </div>
  );
}
