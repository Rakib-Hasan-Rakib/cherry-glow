import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

/* ---------------- Helpers ---------------- */

const getPriceRange = (variants = []) => {
  if (!variants.length) return "—";

  const prices = variants.map((v) => v.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  return min === max ? `৳ ${min}` : `৳ ${min} - ${max}`;
};

const getThumbnail = (images = []) => {
  return images?.[0]?.url || "/placeholder.png";
};

export default function ProductMobileCard({
  products,
  loading,
  onEdit,
  onDelete,
}) {
  return (
    <div className="grid gap-4 sm:hidden">
      {loading
        ? Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-xl bg-muted" />
          ))
        : products.map((p) => (
            <Card
              key={p.id}
              className="space-y-3 p-4 transition hover:shadow-md"
            >
              {/* Image */}
              <Image
                src={getThumbnail(p.images)}
                alt={p.name}
                width={300}
                height={160}
                className="rounded-lg border object-cover w-full h-40"
              />

              {/* Name + Category */}
              <div className="space-y-1">
                <h3 className="font-semibold">{p.name}</h3>

                <p className="text-sm text-muted-foreground">{p.category}</p>
              </div>

              {/* Price */}
              <p className="font-medium">{getPriceRange(p.variants)}</p>

              {/* Badges */}
              <div className="flex gap-2 flex-wrap">
                {p.isFeatured && (
                  <span className="text-xs px-2 py-1 rounded bg-pink-100 text-pink-600">
                    Featured
                  </span>
                )}
                {p.isBestSelling && (
                  <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-600">
                    Best
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => onEdit(p)}
                  className="cursor-pointer"
                >
                  <Pencil className="h-4 w-4" />
                </Button>

                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => onDelete(p._id)}
                  className="cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
    </div>
  );
}
