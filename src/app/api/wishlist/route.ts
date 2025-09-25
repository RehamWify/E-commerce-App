// import { getMyToken } from "@/utilities/token";
// import { NextRequest } from "next/server";
// // import { cookies } from "next/headers";

// export async function GET(req: NextRequest) {
// //   const token = cookies().get("token")?.value;
// const token = await getMyToken()

//   if (!token) {
//     return Response.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
//     headers: { token: token as string },
//     cache: "no-store",
//   });

//   const data = await res.json();
//   return Response.json(data);
// }


import { getMyToken } from "@/utilities/token";
// import { cookies } from "next/headers";

export async function GET() {
  // const token = (await cookies()).get("next-auth.session-token")?.value;
  const token = await getMyToken()
  if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: { token : token as string },
      cache: "no-store",
    });

    const data = await res.json();
    return Response.json(data, { status: res.status });
  } catch (err) {
    return Response.json({ error: "Failed to fetch wishlist" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  // const token =(await cookies()).get("token")?.value;
  const token = await getMyToken()
  if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { productId } = await req.json();

  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token : token as string,
      },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();
    return Response.json(data, { status: res.status });
  } catch (err) {
    return Response.json({ error: "Failed to add to wishlist" }, { status: 500 });
  }
}
