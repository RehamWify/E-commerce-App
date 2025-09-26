"use client";

import React from "react"; 
import { WishlistProduct } from "@/types/wishlist.type";
import { getMyToken } from "@/utilities/token";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { CheckCircleIcon } from "lucide-react";


type WishlistContextType = {
  wishlist: WishlistProduct[];
  wishlistCount: number;
  loading: boolean;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  getUserWishlist: () => Promise<void>;
  isInWishlist: (productId: string) => boolean;
};

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

function WishlistContextProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);
  const [loading, setLoading] = useState(true);
const [wishlistCount, setWishlistCount] = useState<number>(0);

useEffect(() => {
    setWishlistCount(wishlist.length);
}, [wishlist]);




  async function getUserWishlist() {
    setLoading(true);
    try {
        const token = await getMyToken();
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
            token: token as string
        }
      });
      if (!res.ok) throw new Error("Failed to fetch wishlist");
      const data = await res.json();
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
      const token = await getMyToken();
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token as string
        },
        body: JSON.stringify({ productId }),
      });
      console.log(res);
      
        // Success toast
        toast.success("Success to added to wishlist!", {
          duration: 1000,
          position: "top-center",
          icon: <CheckCircleIcon className="text-green-500" />
        });
      } catch (error) {
        console.log(error);
        
        // Fail toast
        toast.error("Failed to added to wishlist.", {
            duration: 1000,
            position: "top-center",
            icon: <CheckCircleIcon className="text-red-500" />
          });
      }
    getUserWishlist();
  }

async function removeFromWishlist(productId: string) {
  try {
    
    const token = await getMyToken();
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            method: "DELETE",
            headers: {
                token: token as string
            }
        });
        console.log(res);

            // Success toast
            toast.success("Removed from wishlist!", {
                duration: 1000,
                position: "top-center",
                icon: <CheckCircleIcon className="text-green-500" />
            });

          } catch (error) {
            console.log(error);
            
            toast.error("Failed to remove from wishlist.", {
                duration: 1000,
                position: "top-center",
                icon: <CheckCircleIcon className="text-red-500" />
            });
  }

    setWishlist((prev) => prev.filter((product) => product._id !== productId));
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
