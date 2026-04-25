"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ComboList({ products }) {
  const router = useRouter();

  const getCombo = () => {
    const stored = localStorage.getItem("combo");
    return stored ? JSON.parse(stored) : [];
  };

  const addToCombo = (product) => {
    const combo = getCombo();

    if (combo.find((p) => p._id === product._id)) return;

    const updated = [...combo, { ...product, selectedVariant: null }];

    localStorage.setItem("combo", JSON.stringify(updated));
    window.dispatchEvent(new Event("comboUpdated"));
  };

  const isSelected = (id) => {
    return getCombo().some((p) => p._id === id);
  };

  const grouped = products.reduce((acc, p) => {
    const cat = p.category || "Others";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {});

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">All Products</h2>

      {Object.entries(grouped).map(([cat, items]) => (
        <div key={cat} className="mb-10">
          <h3 className="font-bold mb-3">{cat}</h3>

          <div className="space-y-3">
            {items.map((p) => (
              <div
                key={p._id}
                className="flex items-center gap-4 p-3 border rounded-xl bg-white dark:bg-gray-800"
              >
                <div
                  onClick={() => router.push(`/products/${p._id}`)}
                  className="relative w-16 h-16 cursor-pointer"
                >
                  {p.images?.[0]?.url && (
                    <Image
                      src={p.images[0].url}
                      alt={p.name}
                      fill
                      sizes="64px"
                      className="object-cover rounded"
                    />
                  )}
                </div>

                <div
                  onClick={() => router.push(`/products/${p._id}`)}
                  className="flex-1 cursor-pointer"
                >
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs">{p.brand}</p>
                </div>

                <button
                  onClick={() => addToCombo(p)}
                  disabled={isSelected(p._id)}
                  className={`px-3 py-1 rounded text-white ${
                    isSelected(p._id) ? "bg-gray-300" : "bg-black"
                  }`}
                >
                  {isSelected(p._id) ? "Added" : "Add"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
