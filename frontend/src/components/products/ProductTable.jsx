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

export default function ProductTable({ products, loading, onEdit, onDelete }) {
  return (
    <div className="hidden sm:block mt-6 rounded-lg border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-foreground">Name</TableHead>
            <TableHead className="text-foreground">Photo</TableHead>
            <TableHead className="text-foreground">Price</TableHead>
            <TableHead className="text-right text-foreground">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={4}>
                    <Skeleton className="h-10 w-full" />
                  </TableCell>
                </TableRow>
              ))
            : products.map((p) => (
                <TableRow key={p._id} className="hover:bg-muted/50">
                  <TableCell className="font-medium capitalize">{p.name}</TableCell>

                  <TableCell>
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={70}
                      height={40}
                      className="rounded-md border bg-muted object-cover"
                    />
                  </TableCell>

                  <TableCell>৳ {p.price}</TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={() => onEdit(p)} className="cursor-pointer"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => onDelete(p._id)} className="cursor-pointer"
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
