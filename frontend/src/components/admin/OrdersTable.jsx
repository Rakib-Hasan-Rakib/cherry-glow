import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

const STATUS = ["pending", "processing", "shipped", "delivered"];

export default function OrdersTable({ orders, loading, onUpdateStatus }) {
  return (
    <div className="hidden sm:block border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
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
            : orders.map((o) => (
                <TableRow key={o._id}>
                  <TableCell>{o.user?.name || "Guest"}</TableCell>

                  <TableCell>৳ {o.totalAmount}</TableCell>

                  <TableCell>
                    <Select
                      value={o.status}
                      onValueChange={(v) => onUpdateStatus(o._id, v)}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        {STATUS.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>

                  <TableCell>
                    {new Date(o.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
