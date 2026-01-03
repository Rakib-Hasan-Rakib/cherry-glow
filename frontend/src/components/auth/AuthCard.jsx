export default function AuthCard({ title, children }) {
  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border bg-background p-6 shadow-lg">
      <h1 className="mb-6 text-center text-2xl font-bold">{title}</h1>
      {children}
    </div>
  );
}
