import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product, onAddToCart }) {
  const { image, name, price, stock, discount } = product;

  const finalPrice = Math.round(price - (price * discount) / 100);

  return (
    <div className="flex h-full cursor-pointer flex-col rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md">
      <span className="text-xs text-right font-bold text-pink-500 bg-gray-100 px-2 py-1 rounded-full self-end">
        {discount > 0 && `${discount}% OFF`}
      </span>
      {/* Image */}
      {/* <Image src={image} alt={name} fill className="object-cover" priority /> */}
      <div className="relative w-full h-48 md:h-56 lg:h-64 mb-4">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain"
          priority
        />
      </div>    

      {/* Content */}
      <div className="flex flex-1 flex-col">
        <h3 className="mt-3 font-semibold text-gray-900">{name}</h3>

        <div className="mt-2 flex items-center justify-between text-sm">
          <div className="flex gap-3 items-baseline">
            <span className="text-lg md:text-xl lg:text-2xl font-bold text-pink-600">
              ৳ {finalPrice}
            </span>
            <span className="text-md line-through">{price}</span>
          </div>
          <span
            className={`text-xs font-medium ${
              stock > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Buttons pushed to bottom */}
        <div className="mt-auto flex gap-3 pt-4">
          <Link
            href={`/products/${product._id}`}
            className="flex w-full items-center justify-center rounded-full border border-pink-500 py-2 text-sm font-medium text-pink-600 transition hover:bg-pink-500 hover:text-white"
          >
            View Details
          </Link>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className={`${
              stock > 0
                ? "w-full rounded-full bg-pink-500 py-2 text-sm font-medium text-white transition hover:bg-pink-600 cursor-pointer"
                : "w-full rounded-full bg-gray-300 py-2 text-sm font-medium text-gray-500 cursor-not-allowed"
            } `}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
