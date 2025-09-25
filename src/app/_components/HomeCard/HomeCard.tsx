"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { HiStar } from "react-icons/hi2";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product.type";
import AddBtnCart from "../AddBtnCart/AddBtnCart";
import { Heart } from "lucide-react";
import { useWishlist } from "@/Context/WishlistContext";

const HomeCard = ({ product }: { product: Product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(isInWishlist(product._id)); // sync with context
  }, [product._id, isInWishlist]);

  async function toggleWishlist() {
    if (liked) {
      setLiked(false); // optimistic UI update
      await removeFromWishlist(product._id);
    } else {
      setLiked(true);
      await addToWishlist(product._id);
    }
  }

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 p-3">
      <div className="inner">
        <Card className="p-2 gap-2">
          <Link href={`/productDetails/${product._id}`}>
            <CardHeader className="p-0">
              <Image
                width={500}
                height={500}
                src={product.imageCover}
                alt={product.title}
              />
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-green-600 font-semibold mb-3">
                {product.category.name}
              </p>
              <p className="line-clamp-1">{product.title}</p>
              <p className="text-amber-500">Quantity : {product.ratingsQuantity}</p>
            </CardContent>
            <CardFooter className="p-0">
              <div className="w-full flex justify-between items-center">
                <p className="text-green-500">{product.price} EGP</p>
                <div className="flex items-center gap-1">
                  <p>{product.ratingsAverage}</p>
                  <HiStar className="text-yellow-300" />
                </div>
              </div>
            </CardFooter>
          </Link>

          {/* ❤️ Heart Icon Button */}
          <div className="w-full flex justify-between items-center ">
            <button onClick={toggleWishlist} className=" rounded-full p-1">
              <Heart
                className={`text-2xl text-green-500 ${
                  liked ? "fill-green-500 text-500" : "text-gray-400"
                }`}
              />
            </button>
          </div>
            <AddBtnCart id={product._id} />
        </Card>
      </div>
    </div>
  );
};

export default HomeCard;
