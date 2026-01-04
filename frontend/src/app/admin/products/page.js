"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { getAuth } from "firebase/auth";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
import ProductMobileCard from "./ProductMobileCard";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState("");

  const API = `${process.env.NEXT_PUBLIC_API_URL}/products`;

  const getToken = async () => {
    const user = getAuth().currentUser;
    if (!user) throw new Error("User not authenticated");
    return user.getIdToken();
  };

  const fetchProducts = async (searchValue = "") => {
    try {
      setLoading(true);

      const query = searchValue
        ? `?search=${encodeURIComponent(searchValue)}`
        : "";

      const res = await fetch(`${API}/allProduct${query}`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch products");

      setProducts(await res.json());
    } catch (err) {
      toast.error(err.message || "Could not load products");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts(search);
    }, 400); // debounce

    return () => clearTimeout(timer);
  }, [search]);

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`${API}/deleteProduct/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (!res.ok) throw new Error("Delete failed");

      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur pb-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-2xl font-bold">Product Management</h1>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingProduct(null)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? "Edit Product" : "Add Product"}
                </DialogTitle>
              </DialogHeader>

              <ProductForm
                product={editingProduct}
                onClose={() => setOpen(false)}
                onSuccess={fetchProducts}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* 🔍 Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Mobile */}
      <ProductMobileCard
        products={products}
        loading={loading}
        onEdit={(p) => {
          setEditingProduct(p);
          setOpen(true);
        }}
        onDelete={deleteProduct}
      />

      {/* Desktop */}
      <ProductTable
        products={products}
        loading={loading}
        onEdit={(p) => {
          setEditingProduct(p);
          setOpen(true);
        }}
        onDelete={deleteProduct}
      />
    </div>
  );
}
