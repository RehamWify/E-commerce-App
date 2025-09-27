"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Heart } from "lucide-react";
import { useWishlist } from "@/Context/WishlistContext";
import WishlistCard from "../_components/WishlistCard/WishlistCard";
import { WishlistProduct } from "@/types/wishlist.type";





export default function Wishlist() {
  const { wishlist, loading } = useWishlist() as {
    wishlist: WishlistProduct[];
    loading: boolean;
  } 

  if (loading) {
    return (
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-64 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  if (wishlist.length === 0)
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center h-[70vh]">
            <Alert className="max-w-md flex flex-col items-center text-center">
            <Heart className="h-10 w-10 mb-2 fill-[#ef4444]" color="#ef4444" /> {/* Use color prop */}
            <AlertTitle>Your Wishlist is Empty</AlertTitle>
            <AlertDescription>
              Browse products and add some to your wishlist!
            </AlertDescription>
            </Alert>
        </div>
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center justify-center gap-2">
        <Heart className="h-7 w-7 text-red-500" />
        My Wishlist
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {wishlist.map((product) => (
          <WishlistCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
