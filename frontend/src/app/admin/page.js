export default function DashboardPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-4 gap-4">
        <Card title="Total Sales" value="৳120,000" />
        <Card title="Orders" value="320" />
        <Card title="Products" value="58" />
        <Card title="Low Stock" value="4" />
      </div>
    </>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
