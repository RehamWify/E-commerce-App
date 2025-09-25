// import { cookies } from "next/headers";

import { getMyToken } from "@/utilities/token";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
//   const token = cookies().get("token")?.value;
const token = await getMyToken();
  if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${params.id}`, {
      method: "DELETE",
      headers: { token : token as string},
    });

    const data = await res.json();
    return Response.json(data, { status: res.status });
  } catch (err) {
    return Response.json({ error: "Failed to remove from wishlist" }, { status: 500 });
  }
}
