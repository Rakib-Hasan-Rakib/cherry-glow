import Link from "next/link";

export default function ProductCard({ product, onAddToCart }) {
  const { image, name, price, stock } = product;
  return (
    <div className="cursor-pointer rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm hover:shadow-md transition">
      <img
        src={image}
        alt={name}
        className="h-48 w-full object-cover rounded-lg"
      />

      <h3 className="mt-3 font-semibold text-gray-900 dark:text-gray-100">
        {name}
      </h3>

      {/* Price & Stock */}
      <div className="flex justify-between items-center mt-2 text-sm">
        <span className="font-bold text-pink-600">৳ {price}</span>
        <span
          className={`text-xs font-medium ${
            stock > 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {stock > 0 ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Stop click bubbling for Add to Cart */}
      <div className="flex gap-4">
        <button className="mt-3 inline-block w-full text-center rounded-full border border-pink-500 hover:bg-pink-600 hover:text-white transition py-2 text-sm font-medium hover:bg-pink-600 transition">
          <Link href={`/products/${product._id}`}>View Details</Link>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="mt-3 w-full rounded-full cursor-pointer bg-pink-500 py-2 text-white hover:bg-pink-600 text-sm font-medium transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
