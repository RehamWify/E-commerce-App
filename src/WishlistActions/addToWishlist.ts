"use server"

import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function AddToWishlistAction(id: string) {
  const token = await getMyToken();

  if(!token){
    throw new Error("Login First")
  }

  const values = {
    productId: id,
  };

  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/wishlist`,
    values,
    {
      headers: {
        token: token as string,
      },
    }
  );

  return data
}

