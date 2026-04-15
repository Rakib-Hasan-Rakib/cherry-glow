"use client";

import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Plus, Search } from "lucide-react";
import { getAuth } from "firebase/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import ProductTable from "../../../components/products/ProductTable";
import ProductMobileCard from "../../../components/products/ProductMobileCard";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const router = useRouter();
  const API = `${process.env.NEXT_PUBLIC_API_URL}/products`;

  const getToken = async () => {
    const user = getAuth().currentUser;
    if (!user) throw new Error("User not authenticated");
    return user.getIdToken();
  };

  /* ---------------- Helpers ---------------- */

  // 💰 get min price from variants
  const getMinPrice = (variants = []) => {
    if (!variants.length) return 0;
    return Math.min(...variants.map((v) => v.price));
  };

  // 🖼️ get thumbnail
  const getThumbnail = (images = []) => {
    return images?.[0]?.url || "/placeholder.png";
  };

  // 🔥 normalize data (important if Mongo returns $oid)
  const normalizedProducts = useMemo(() => {
    return products.map((p) => ({
      ...p,
      id: p._id?.$oid || p._id, // handle both cases
      minPrice: getMinPrice(p.variants),
      thumbnail: getThumbnail(p.images),
    }));
  }, [products]);

  /* ---------------- Fetch ---------------- */

  const fetchProducts = async (searchValue = "") => {
    try {
      setLoading(true);

      const token = await getToken();

      const res = await axios.get(`${API}/allProduct`, {
        params: searchValue ? { search: searchValue } : {},
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(res.data);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  /* ---------------- Delete ---------------- */

  const deleteProduct = async (id) => {
    try {
      const token = await getToken();

      await axios.delete(`${API}/deleteProduct/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed");
    }
  };
  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-bold">
          Product Management ({normalizedProducts.length})
        </h1>

        <Button
          onClick={() => router.push("/admin/create")}
          className="gap-2 bg-pink-500 hover:bg-pink-600 text-white"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by product name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Mobile */}
      <ProductMobileCard
        products={normalizedProducts}
        loading={loading}
        onEdit={(p) => router.push(`/admin/edit/${p.id}`)}
        onDelete={(id) => deleteProduct(id)}
      />

      {/* Desktop */}
      <ProductTable
        products={normalizedProducts}
        loading={loading}
        onEdit={(p) => router.push(`/admin/edit/${p.id}`)}
        onDelete={(id) => deleteProduct(id)}
      />
    </div>
  );
}
