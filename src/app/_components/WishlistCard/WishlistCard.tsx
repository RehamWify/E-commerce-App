"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/Context/WishlistContext";
import { WishlistProduct } from "@/types/wishlist.type";
import { HiTrash } from "react-icons/hi2";


export default function WishlistCard({ product } : { product: WishlistProduct }) {
  const { removeFromWishlist } = useWishlist();

  return (
    <Card className="shadow-lg rounded-2xl hover:shadow-2xl transition">
      <CardHeader>
        <CardTitle className="text-center text-lg line-clamp-1">{product.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <Image
          src={product.imageCover}
          alt={product.title}
          width={200}
          height={200}
          className="object-contain rounded-xl"
          priority
        />
        <p className="text-green-600 mt-2 font-medium">Price : {product.price} EGP</p>
        <Button
          variant="destructive"
          size="sm"
          className="mt-3 flex items-center gap-2"
          onClick={() => removeFromWishlist(product._id)}
        >
          <HiTrash className="h-4 w-4" />
          Remove
        </Button>
      </CardContent>
    </Card>
  );
}
