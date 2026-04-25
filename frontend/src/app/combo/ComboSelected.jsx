"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ComboSelected({
  combo,
  removeFromCombo,
  updateVariant,
}) {
  const router = useRouter();

  if (combo.length === 0) {
    return <p>No products selected</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Selected Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {combo.map((p) => (
          <div
            key={p._id}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
          >
            <div className="flex gap-4">
              <div
                onClick={() => router.push(`/products/${p._id}`)}
                className="relative w-20 h-20 cursor-pointer"
              >
                {p.images?.[0]?.url && (
                  <Image
                    src={p.images[0].url}
                    alt={p.name}
                    fill
                    sizes="80px"
                    className="object-cover rounded"
                  />
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-medium">{p.name}</h3>

                {/* VARIANT */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {p.variants?.map((v) => {
                    const active =
                      p.selectedVariant?.weight === v.weight &&
                      p.selectedVariant?.unit === v.unit;

                    return (
                      <button
                        key={`${v.weight}-${v.unit}`}
                        onClick={() => updateVariant(p._id, v)}
                        className={`px-3 py-1 text-xs rounded-full ${
                          active
                            ? "bg-black text-white"
                            : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      >
                        {v.weight}
                        {v.unit}
                      </button>
                    );
                  })}
                </div>

                <p className="mt-2 text-sm">
                  ৳{" "}
                  {p.selectedVariant
                    ? p.selectedVariant.price
                    : "Select variant"}
                </p>
              </div>

              <button
                onClick={() => removeFromCombo(p._id)}
                className="text-red-500"
              >
                <Trash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
