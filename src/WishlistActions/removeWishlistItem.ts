"use server";

import { getMyToken } from "@/utilities/token";

export async function removeWishlistItemAction(productId: string) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Login First");
  }

  const data = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    {
      method: "DELETE",
      headers: {
        token: token as string,
      },
    }
  );

  return data;
}
