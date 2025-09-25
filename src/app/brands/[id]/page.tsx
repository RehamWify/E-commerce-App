import React from "react";
import { Product } from "@/types/product.type";
import Image from "next/image";

export default async function BrandProducts({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  let data: Product[] = [];

  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`,
      { cache: "no-store" } // optional: disable cache for fresh data
    );

    if (!res.ok) throw new Error("Failed to fetch products");

    const json = await res.json();
    data = json.data;
  } catch (error) {
    console.error("Failed to load products:", error);
  }

  return (
    <div className="p-6">
      {data.length === 0 ? (
        <p className="text-red-600 text-3xl font-semibold text-center">No products found for this Brand.</p>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6 text-center">
            Products for Brand
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data.map((product: Product) => (
              <div
                key={product._id}
                className="bg-white shadow rounded-2xl p-4 hover:shadow-2xl transition"
              >
                <Image
                  priority
                  width={200}
                  height={200}
                  src={product.imageCover}
                  alt={product.title}
                  className="h-32 mx-auto object-contain mb-4"
                />
                <h2 className="text-lg font-semibold text-center">
                  {product.title}
                </h2>
                <p className=" text-center text-green-500">
                  Price: {product.price} EGP
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
