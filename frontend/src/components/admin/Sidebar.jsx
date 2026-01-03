export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-5">
      <h2 className="text-xl font-bold mb-6">Cherry Glow</h2>
      <nav className="space-y-3">
        <a href="/admin">Dashboard</a>
        <a href="/admin/products">Products</a>
        <a href="/admin/roles">Users</a>
      </nav>
    </aside>
  );
}
