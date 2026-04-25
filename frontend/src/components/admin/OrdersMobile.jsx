import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";


export default function OrdersMobile({ orders, loading, onUpdateStatus, status, statusStyles }) {
  return (
    <div className="grid gap-4 sm:hidden">
      {loading
        ? Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))
        : orders.map((o) => (
            <Card key={o._id} className="p-4 space-y-2">
              <h3 className="font-semibold">{o.customer?.name || "Guest"}</h3>

              <p>৳ {o?.pricing?.total}</p>

              <Select
                value={o.status}
                onValueChange={(v) => onUpdateStatus(o._id, v)}
              >
                <SelectTrigger>
                  <span
                    className={`px-2 py-1 rounded text-xs ${statusStyles[o.status]}`}
                  >
                    {o.status}
                  </span>
                </SelectTrigger>

                <SelectContent>
                  {status.map((s) => (
                    <SelectItem key={s} value={s}>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          statusStyles[s] || ""
                        }`}
                      >
                        {s}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <p className="text-sm text-muted-foreground">
                {new Date(o.createdAt).toLocaleDateString()}
              </p>
            </Card>
          ))}
    </div>
  );
}
