import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

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
              key={p._id}
              className="space-y-3 p-4 transition-colors hover:bg-muted/40"
            >
              <Image
                src={p.image}
                alt={p.name}
                width={300}
                height={160}
                className="rounded-lg border bg-muted object-cover"
              />

              <div className="space-y-1">
                <h3 className="font-semibold text-foreground">{p.name}</h3>

                <p className="text-sm text-muted-foreground">
                  {p.category} • {p.section}
                </p>
              </div>

              <p className="font-medium text-foreground">৳ {p.price}</p>

              <div className="flex gap-2 pt-1">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => onEdit(p)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>

                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => onDelete(p._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
    </div>
  );
}
