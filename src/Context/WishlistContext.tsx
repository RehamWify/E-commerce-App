"use client";
import React from "react"; 
import { WishlistProduct } from "@/types/wishlist.type";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { CheckCircleIcon } from "lucide-react";
import { getUserWishlistAction } from "@/WishlistActions/getUserWishlist";
import { AddToWishlistAction } from "@/WishlistActions/addToWishlist";
import { removeWishlistItemAction } from "@/WishlistActions/removeWishlistItem";



export const WishlistContext = createContext({});

function WishlistContextProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);
  const [loading, setLoading] = useState(false);
const [wishlistCount, setWishlistCount] = useState<number>(0);

useEffect(() => {
    setWishlistCount(wishlist.length);
}, [wishlist]);


  async function getUserWishlist() {
    setLoading(true);
    try {
      const  data  = await getUserWishlistAction();
      setWishlist(data.data || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  }


  async function addToWishlist(productId: string) {
    try {
      const data = await AddToWishlistAction(productId);
      
      // Success toast
      toast.success(data.message, {
        duration: 1000,
        position: "top-center",
        icon: <CheckCircleIcon className="text-green-500" />
      });
      getUserWishlist();
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      
      // Fail toast
      toast.error("Failed to added to wishlist.", {
        duration: 1000,
        position: "top-center",
        icon: <CheckCircleIcon className="text-red-500" />
      });
    }
  }

async function removeFromWishlist(productId: string) {
  try {
        const data = await removeWishlistItemAction(productId);
        
        // Success toast
        toast.success(data.message, {
          duration: 1000,
          position: "top-center",
          icon: <CheckCircleIcon className="text-green-500" />
        });
        setWishlist((prev) => prev.filter((product) => product._id !== productId));
        setWishlistCount((prev) => prev - 1);
        // setWishlistCount(data?.data.numOfWishlistItems);
        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
        
        toast.error("Failed to remove from wishlist.", {
          duration: 1000,
          position: "top-center",
          icon: <CheckCircleIcon className="text-red-500" />
        });
      }
      
}


  function isInWishlist(productId: string) {
return wishlist.map(product => product._id).includes(productId);
}


  useEffect(() => {
    getUserWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount,
        loading,
        addToWishlist,
        removeFromWishlist,
        getUserWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistContextProvider;

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used inside WishlistProvider");
  return context;
}
