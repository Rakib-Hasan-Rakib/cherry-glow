import { Card as UiCard, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-foreground">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Sales" value="৳120,000" />
        <StatCard title="Orders" value="320" />
        <StatCard title="Products" value="58" />
        <StatCard title="Low Stock" value="4" />
      </div>
    </>
  );
}

function StatCard({ title, value }) {
  return (
    <UiCard className="bg-card text-card-foreground shadow-sm">
      <CardContent className="p-4 space-y-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </CardContent>
    </UiCard>
  );
}
