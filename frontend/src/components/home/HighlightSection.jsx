export default function HighlightsSection() {
  const items = [
    "Dermatologist Tested",
    "100% Organic Ingredients",
    "Cruelty Free",
    "Worldwide Shipping",
  ];

  return (
    <section className="border-b">
      <div className="mx-auto max-w-7xl px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {items.map((item) => (
          <div key={item} className="font-medium bg-gray-100 p-4 rounded-lg">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
