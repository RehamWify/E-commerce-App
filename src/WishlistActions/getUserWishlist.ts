"use server";

import { getMyToken } from "@/utilities/token"

export async function getUserWishlistAction (){
    const token = await getMyToken()

    if (!token){
        throw new Error("Login First")
    }

     const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
            token: token as string
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to fetch wishlist");

    return data
}