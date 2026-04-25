"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import useDebounce from "@/lib/useDebounce";

export default function CreateOrderPage() {
  const API = `${process.env.NEXT_PUBLIC_API_URL}`;

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [variant, setVariant] = useState(null);
  const [qty, setQty] = useState(1);

  const [items, setItems] = useState([]);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  });

  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const debouncedSearch = useDebounce(search, 400);

  // 🔥 fetch products
  useEffect(() => {
    axios
      .get(`${API}/products/allProduct`)
      .then((res) => setProducts(res.data || []));
  }, []);

  // 🔍 filtered products
  const filtered = useMemo(() => {
    if (!debouncedSearch) return [];
    return products.filter((p) =>
      p.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [debouncedSearch, products]);

  // ➕ Add product
  const addItem = () => {
    if (!selectedProduct) return toast.error("Select product");
    if (!variant) return toast.error("Select variant");

    const exists = items.find(
      (i) =>
        i.productId === selectedProduct._id &&
        i.variant.weight === variant.weight &&
        i.variant.unit === variant.unit,
    );

    if (exists) {
      setItems((prev) =>
        prev.map((i) =>
          i === exists ? { ...i, quantity: i.quantity + qty } : i,
        ),
      );
    } else {
      setItems((prev) => [
        ...prev,
        {
          productId: selectedProduct._id,
          name: selectedProduct.name,
          image: selectedProduct.images?.[0]?.url || "",
          variant,
          price: variant.price,
          quantity: qty,
        },
      ]);
    }

    // reset
    setSelectedProduct(null);
    setVariant(null);
    setQty(1);
    setSearch("");
  };

  // ❌ remove
  const removeItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  // 🔢 update qty
  const updateQty = (index, value) => {
    const q = Math.max(1, Number(value) || 1);
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, quantity: q } : item)),
    );
  };

  // 💰 calculations
  const subtotal = useMemo(() => {
    return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }, [items]);

  const total = subtotal - discount + shipping;

  // 🚀 Create order
  const createOrder = async () => {
    // 🔒 Basic validation
    if (!customer.name || !customer.phone || !customer.address) {
      return toast.error("Fill required customer info");
    }

    if (items.length === 0) {
      return toast.error("Add at least one product");
    }

    // 🔒 Ensure variant exists
    const invalidItem = items.find((i) => !i.variant);
    if (invalidItem) {
      return toast.error("All items must have a variant selected");
    }

    // 🔒 Sanitize numbers
    const safeSubtotal = Number(subtotal) || 0;
    const safeDiscount = Number(discount) || 0;
    const safeShipping = Number(shipping) || 0;
    const safeTotal = safeSubtotal - safeDiscount + safeShipping;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/admin-create`,
        {
          customer,
          items,

          subtotal: safeSubtotal,
          discount: safeDiscount,
          shipping: safeShipping,
          total: safeTotal,

          status: "pending", // ✅ important
          source: "admin", // ✅ important
        },
      );

      if (response.status === 201) {
        toast.success("Order created successfully");setItems([]);
        setCustomer({
          name: "",
          phone: "",
          address: "",
          email: "",
        });
        setDiscount(0);
        setShipping(0);
      }

    } catch (err) {
      console.error(err);
      toast.error("Failed to create order");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Create Order</h1>

      {/* 🧾 CUSTOMER INFO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          placeholder="Name"
          value={customer.name}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          placeholder="Phone"
          value={customer.phone}
          onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          placeholder="Email"
          value={customer.email}
          onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          placeholder="Address"
          value={customer.address}
          onChange={(e) =>
            setCustomer({ ...customer, address: e.target.value })
          }
          className="border p-2 rounded"
        />
      </div>

      {/* 🔍 ADD PRODUCT */}
      <div className="space-y-3">
        <h2 className="font-semibold">Add Product</h2>

        <input
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />

        {/* Results */}
        {search && (
          <div className="border rounded max-h-40 overflow-y-auto">
            {filtered.map((p) => (
              <div
                key={p._id}
                onClick={() => {
                  setSelectedProduct(p);
                  setSearch(p.name);
                }}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {p.name}
              </div>
            ))}
          </div>
        )}

        {/* Variant */}
        {selectedProduct && (
          <div className="flex flex-wrap gap-2">
            {selectedProduct.variants?.map((v) => (
              <button
                key={`${v.weight}-${v.unit}`}
                onClick={() => setVariant(v)}
                className={`px-3 py-1 rounded ${
                  variant?.weight === v.weight && variant?.unit === v.unit
                    ? "bg-black text-white"
                    : "bg-gray-200"
                }`}
              >
                {v.weight}
                {v.unit} (৳{v.price})
              </button>
            ))}
          </div>
        )}

        {/* Qty */}
        <input
          type="number"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          className="border p-2 w-24 rounded"
        />

        <button
          onClick={addItem}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add to Order
        </button>
      </div>

      {/* 🛒 ITEMS */}
      <div className="space-y-4">
        <h2 className="font-semibold">Selected Items</h2>

        {items.map((item, index) => (
          <div
            key={`${item.productId}-${item.variant.weight}-${index}`}
            className="flex items-center gap-4 border p-3 rounded"
          >
            {item.image && (
              <Image
                src={item.image}
                alt={item.name}
                width={60}
                height={60}
                className="rounded"
              />
            )}

            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm">
                {item.variant.weight}
                {item.variant.unit}
              </p>
              <p className="text-sm">৳ {item.price}</p>
            </div>

            <input
              type="number"
              value={item.quantity}
              onChange={(e) => updateQty(index, e.target.value)}
              className="border w-16 p-1"
            />

            <button onClick={() => removeItem(index)}>
              <Trash2 className="text-red-500" />
            </button>
          </div>
        ))}
      </div>

      {/* 💰 SUMMARY */}
      <div className="max-w-sm ml-auto border p-4 rounded space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>৳ {subtotal}</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Discount</span>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            className="border w-24 p-1"
          />
        </div>

        <div className="flex justify-between items-center">
          <span>Shipping</span>
          <input
            type="number"
            value={shipping}
            onChange={(e) => setShipping(Number(e.target.value))}
            className="border w-24 p-1"
          />
        </div>

        <div className="border-t" />

        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>৳ {total}</span>
        </div>

        <button
          onClick={createOrder}
          className="w-full bg-green-600 text-white py-2 rounded mt-3"
        >
          Create Order
        </button>
      </div>
    </div>
  );
}
