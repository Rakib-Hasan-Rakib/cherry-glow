"use client";

import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CATEGORIES = ["NONE", "CLEANSER", "TONER", "SERUMS", "EYE CARE", "MOISTURIZER", "SUNSCREEN", "MASK", "OIL"];
const SECTIONS = ["featured", "new", "best"];
const UNITS = ["ml", "g"];

export default function ProductForm({ product, onClose, onSuccess }) {
  const [submitting, setSubmitting] = useState(false);
  const [image, setImage] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    section: "featured",
    stock: "",
    quantity: "",
    quantityUnit: "ml",
    brand: "",
    description: "",
    useCase: "",
    discount: "",
  });

  const API = `${process.env.NEXT_PUBLIC_API_URL}/products`;

  /* Prefill when editing */
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        price: product.price || "",
        category: product.category || "",
        section: product.section || "featured",
        stock: product.stock || "",
        quantity: product.quantity || "",
        quantityUnit: product.quantityUnit || "ml",
        brand: product.brand || "",
        description: product.description || "",
        useCase: product.useCase || "",
        discount: product.discount || "",
      });
    }
  }, [product]);

  const getToken = async () => {
    const user = getAuth().currentUser;
    if (!user) throw new Error("Not authenticated");
    return user.getIdToken();
  };

  /* ---------------- Validation ---------------- */
  const validateForm = () => {
    const price = Number(form.price);
    const stock = Number(form.stock);
    const quantity = Number(form.quantity);
    const discount = Number(form.discount);

    if (!form.name.trim()) {
      toast.error("Product name is required");
      return false;
    }

    if (!form.category) {
      toast.error("Category is required");
      return false;
    }

    if (isNaN(price) || price <= 0) {
      toast.error("Price must be a positive number");
      return false;
    }

    if (form.quantity && (isNaN(quantity) || quantity <= 0)) {
      toast.error("Quantity must be a positive number");
      return false;
    }

    if (form.stock && (isNaN(stock) || stock < 0)) {
      toast.error("Stock must be a positive number");
      return false;
    }

    if (form.discount && (isNaN(discount) || discount < 0 || discount > 100)) {
      toast.error("Discount must be between 0 and 100");
      return false;
    }

    return true;
  };

  /* ---------------- Submit ---------------- */
  const handleSubmit = async () => {
    if (!validateForm()) return;

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

      <div className="flex gap-4">
        <Input
          type="number"
          placeholder="Price"
          min="0"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Discount (%)"
          min="0"
          max="100"
          value={form.discount}
          onChange={(e) => setForm({ ...form, discount: e.target.value })}
        />
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Brand"
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
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
      </div>

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

      <Textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <Textarea
        placeholder="Use Case"
        value={form.useCase}
        onChange={(e) => setForm({ ...form, useCase: e.target.value })}
      />

      {/* Quantity + Unit */}
      <div className="grid grid-cols-3 gap-3">
        <Input
          type="number"
          placeholder="Quantity"
          min="0"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />

        <Select
          value={form.quantityUnit}
          onValueChange={(v) => setForm({ ...form, quantityUnit: v })}
        >
          <SelectTrigger className="col-span-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {UNITS.map((u) => (
              <SelectItem key={u} value={u}>
                {u.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="Stock"
          min="0"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />
      </div>

      <Input
        type="file"
        accept="image/*"
        className="cursor-pointer file:text-sm file:font-medium"
        onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
      />

      <Button className="w-full" onClick={handleSubmit} disabled={submitting}>
        {submitting ? "Saving..." : product ? "Update Product" : "Save Product"}
      </Button>
    </div>
  );
}
