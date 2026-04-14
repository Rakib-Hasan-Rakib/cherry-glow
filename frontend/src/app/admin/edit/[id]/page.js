"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";

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
import { Trash2 } from "lucide-react";

const CATEGORIES = [
  "CLEANSER",
  "TONER",
  "SERUM",
  "EYE CARE",
  "MOISTURIZER",
  "SUNSCREEN",
  "MASK",
  "OIL",
];

const UNITS = ["ml", "g"];

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    useCase: "",
    discountType: "none",
    discountValue: "",
    isFeatured: false,
    isBestSelling: false,
  });

  const [variants, setVariants] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([{ file: null }]);

  const API = `${process.env.NEXT_PUBLIC_API_URL}/products`;

  const getToken = async () => {
    const user = getAuth().currentUser;
    return user.getIdToken();
  };

  /* ---------------- Fetch Product ---------------- */

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = await getToken();

        const res = await axios.get(`${API}/singleProduct/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const p = res.data;

        setForm({
          name: p.name || "",
          brand: p.brand || "",
          category: p.category || "",
          description: p.description || "",
          useCase: p.useCase || "",
          discountType: p.discountType || "none",
          discountValue: p.discountValue || "",
          isFeatured: p.isFeatured || false,
          isBestSelling: p.isBestSelling || false,
        });

        setVariants(p.variants || []);
        setExistingImages(p.images || []);
      } catch (err) {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  /* ---------------- Variants ---------------- */

  const updateVariant = (i, field, value) => {
    const updated = [...variants];
    updated[i][field] = value;
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      { weight: "", unit: "ml", price: "", stock: "" },
    ]);
  };

  const removeVariant = (i) => {
    setVariants(variants.filter((_, idx) => idx !== i));
  };

  /* ---------------- Images ---------------- */

  const removeExistingImage = (i) => {
    setExistingImages(existingImages.filter((_, idx) => idx !== i));
  };

  const updateNewImage = (i, file) => {
    const updated = [...newImages];
    updated[i].file = file;
    setNewImages(updated);
  };

  const addNewImageField = () => {
    setNewImages([...newImages, { file: null }]);
  };

  const canAddImage =
    newImages.length > 0 && newImages[newImages.length - 1].file !== null;

  /* ---------------- Submit ---------------- */

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const token = await getToken();

      const formData = new FormData();

      Object.entries(form).forEach(([k, v]) => formData.append(k, String(v)));

      formData.append("variants", JSON.stringify(variants));

      // keep existing images
      formData.append("existingImages", JSON.stringify(existingImages));

      // new images
      newImages.forEach((img) => {
        if (img.file) formData.append("images", img.file);
      });

      await axios.put(`${API}/updateProduct/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Product updated");

      setTimeout(() => {
        router.replace("/admin/products");
      }, 800);
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">Edit Product</h1>

      {/* Basic */}
      <Input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Name"
      />

      <Input
        value={form.brand}
        onChange={(e) => setForm({ ...form, brand: e.target.value })}
        placeholder="Brand"
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

      <Textarea
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        placeholder="Description"
      />

      {/* Variants */}
      <div className="flex justify-between">
        <h2>Variants</h2>
        <Button
          className="bg-pink-500 text-primary-foreground hover:bg-pink-600 cursor-pointer"
          onClick={addVariant}
        >
          Add
        </Button>
      </div>

      {variants.map((v, i) => (
        <div key={i} className="grid grid-cols-5 gap-2">
          <Input
            value={v.weight}
            onChange={(e) => updateVariant(i, "weight", e.target.value)}
          />
          <Input
            value={v.unit}
            onChange={(e) => updateVariant(i, "unit", e.target.value)}
          />
          <Input
            value={v.price}
            onChange={(e) => updateVariant(i, "price", e.target.value)}
          />
          <Input
            value={v.stock}
            onChange={(e) => updateVariant(i, "stock", e.target.value)}
          />

          <Button
            className="cursor-pointer"
            variant="destructive"
            onClick={() => removeVariant(i)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}

      {/* Existing Images */}
      <div>
        <h2 className="font-semibold my-2 md:my-4 lg:my-6 text-center text-lg">
          Existing Images
        </h2>
        <div className="flex gap-2">
          {existingImages.map((img, i) => (
            <div key={i} className="relative">
              <img
                src={img.url}
                className="w-40 h-40 object-cover border border-pink-300 rounded"
              />
              <button
                onClick={() => removeExistingImage(i)}
                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-1/2 cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* New Images */}
      <div>
        <h2 className="font-semibold my-2 md:my-4 lg:my-6 text-center text-lg">
          Add New Images
        </h2>

        <div className="space-y-3">
          {newImages.map((img, i) => (
            <div key={i} className="flex justify-between items-center gap-3">
              <Input
                key={i}
                type="file"
                onChange={(e) => updateNewImage(i, e.target.files[0])}
              />
              {img.file && (
                <img
                  src={URL.createObjectURL(img.file)}
                  className="flex-shrink-0 w-32 h-32 object-cover rounded"
                />
              )}
              <Button
                className="bg-pink-500 text-primary-foreground hover:bg-pink-600 cursor-pointer"
                onClick={addNewImageField}
                disabled={!canAddImage}
              >
                Add Another
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <Button
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-pink-500 hover:bg-pink-600 text-white px-8 cursor-pointer"
        >
          {submitting ? "Updating..." : "Update Product"}
        </Button>
      </div>
    </div>
  );
}
