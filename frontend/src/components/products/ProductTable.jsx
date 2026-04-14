import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

export default function ProductTable({ products, loading, onEdit, onDelete }) {
  return (
    <div className="hidden sm:block mt-6 rounded-lg border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Photo</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={5}>
                    <Skeleton className="h-10 w-full" />
                  </TableCell>
                </TableRow>
              ))
            : products.map((p) => (
                <TableRow key={p.id} className="hover:bg-muted/50">
                  {/* Name */}
                  <TableCell className="font-medium capitalize">
                    {p.name}
                  </TableCell>

                  {/* Image */}
                  <TableCell>
                    <Image
                      src={getThumbnail(p.images)}
                      alt={p.name}
                      width={60}
                      height={60}
                      className="rounded-md border object-cover"
                    />
                  </TableCell>

                  {/* Price Range */}
                  <TableCell>{getPriceRange(p.variants)}</TableCell>

                  {/* Status Badges */}
                  <TableCell>
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
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
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
                        onClick={() => onDelete(p.id)}
                        className="cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
