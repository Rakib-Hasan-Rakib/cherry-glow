"use client";

import { useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
import { motion, AnimatePresence } from "framer-motion";
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

export default function CreateProductPage() {
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [imageFields, setImageFields] = useState([{ file: null }]);

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

  const [variants, setVariants] = useState([
    { weight: "", unit: "ml", price: "", stock: "" },
  ]);

  const API = `${process.env.NEXT_PUBLIC_API_URL}/products`;

  const getToken = async () => {
    const user = getAuth().currentUser;
    if (!user) throw new Error("Not authenticated");
    return user.getIdToken();
  };

  /* ---------------- Variants ---------------- */
  const addVariant = () => {
    setVariants([
      ...variants,
      { weight: "", unit: "ml", price: "", stock: "" },
    ]);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const updateVariant = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  /* ---------------- Images ---------------- */
  const updateImage = (index, file) => {
    const updated = [...imageFields];
    updated[index].file = file;
    setImageFields(updated);
  };

  const addImageField = () => {
    setImageFields([...imageFields, { file: null }]);
  };

  const removeImageField = (index) => {
    setImageFields(imageFields.filter((_, i) => i !== index));
  };

  const canAddMoreImages =
    imageFields.length > 0 && imageFields[imageFields.length - 1].file !== null;

  /* ---------------- Validation ---------------- */
  const validate = () => {
    if (!form.name.trim()) return toast.error("Name required");
    if (!form.category) return toast.error("Category required");

    for (let v of variants) {
      if (!v.price || Number(v.price) <= 0)
        return toast.error("Invalid variant price");
    }

    if (
      form.discountType !== "none" &&
      (!form.discountValue || Number(form.discountValue) <= 0)
    ) {
      return toast.error("Invalid discount value");
    }

    return true;
  };

  /* ---------------- Submit ---------------- */
  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setSubmitting(true);
      const token = await getToken();

      const formData = new FormData();

      // basic
      Object.entries(form).forEach(([k, v]) => formData.append(k, String(v)));

      // variants
      formData.append("variants", JSON.stringify(variants));

      // images
      imageFields.forEach((imgObj) => {
        if (imgObj.file) {
          formData.append("images", imgObj.file);
        }
      });

      const res = await axios.post(`${API}/addProduct`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Product created", {
        duration: 1000,
      });

      // small delay so user can SEE the toast
      setTimeout(() => {
        router.replace("/admin/products");
      }, 1000);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">Create Product</h1>

      {/* Basic */}
      <Input
        placeholder="Product Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

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

      {/* Discount */}
      <div className="grid grid-cols-2 gap-3">
        <Select
          value={form.discountType}
          onValueChange={(v) => setForm({ ...form, discountType: v })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Discount Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No Discount</SelectItem>
            <SelectItem value="percentage">Percentage</SelectItem>
            <SelectItem value="fixed">Fixed</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="Discount Value"
          value={form.discountValue}
          onChange={(e) => setForm({ ...form, discountValue: e.target.value })}
        />
      </div>

      {/* Toggles */}
      <div className="flex gap-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
          />
          Featured
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isBestSelling}
            onChange={(e) =>
              setForm({ ...form, isBestSelling: e.target.checked })
            }
          />
          Best Selling
        </label>
      </div>

      {/* Variants Header */}
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">Variants</h2>
        <Button
          className="bg-pink-500 text-primary-foreground hover:bg-pink-600 cursor-pointer"
          onClick={addVariant}
        >
          Add Variant
        </Button>
      </div>

      {/* Variants */}

      <motion.div layout className="space-y-3">
        <AnimatePresence>
          {variants.map((v, i) => (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="flex gap-2 bg-muted/30 p-2 rounded-lg"
            >
              <Input
                placeholder="Weight"
                value={v.weight}
                onChange={(e) => updateVariant(i, "weight", e.target.value)}
              />

              <Select
                value={v.unit}
                onValueChange={(val) => updateVariant(i, "unit", val)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {UNITS.map((u) => (
                    <SelectItem key={u} value={u}>
                      {u}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                type="number"
                placeholder="Price"
                value={v.price}
                onChange={(e) => updateVariant(i, "price", e.target.value)}
              />

              <Input
                type="number"
                placeholder="Stock"
                value={v.stock}
                onChange={(e) => updateVariant(i, "stock", e.target.value)}
              />

              {variants.length > 1 && (
                <Button
                  variant="destructive"
                  onClick={() => removeVariant(i)}
                  className="cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Images */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Images</h2>

          <Button
            type="button"
            onClick={addImageField}
            disabled={!canAddMoreImages}
            className="bg-pink-500 text-primary-foreground hover:bg-pink-600 cursor-pointer"
          >
            Add Another Image
          </Button>
        </div>

        <motion.div layout className="space-y-2">
          <AnimatePresence>
            {imageFields.map((img, i) => (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-3 bg-muted/30 p-2 rounded-lg"
              >
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => updateImage(i, e.target.files?.[0] || null)}
                  className="flex-1"
                />

                {img.file && (
                  <motion.img
                    src={URL.createObjectURL(img.file)}
                    className="flex-shrink-0 w-32 h-32 object-cover rounded"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  />
                )}

                {imageFields.length > 1 && (
                  <Button
                    variant="destructive"
                    className="cursor-pointer"
                    onClick={() => removeImageField(i)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Submit */}
      <div className="flex justify-center mt-4">
        <Button
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-pink-500 hover:bg-pink-600 text-white px-8 cursor-pointer"
        >
          {submitting ? "Creating..." : "Create Product"}
        </Button>
      </div>
    </div>
  );
}
