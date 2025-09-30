"use server";

import { getMyToken } from "@/utilities/token"

export async function getUserWishlistAction (){
    const token = await getMyToken()

    if (!token){
        throw new Error("Login First")
    }

     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist`, {
        headers: {
            token: token as string
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to fetch wishlist");

    return data
}