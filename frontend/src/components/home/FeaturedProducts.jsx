import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import ProductCard from "../shared/ProductCard";
import { useEffect, useState } from "react";



export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  


  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/products/featured`)
      .then((res) => res.json())
      .then(setFeaturedProducts);
  }, []);


  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Products
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
