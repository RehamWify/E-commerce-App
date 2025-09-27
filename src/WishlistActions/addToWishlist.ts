"use server";

import { getMyToken } from "@/utilities/token";

export async function AddToWishlistAction(productId: string) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Login First");
  }

  const data = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token as string,
    },
    body: JSON.stringify({ productId }),
  });

  return data;
}
