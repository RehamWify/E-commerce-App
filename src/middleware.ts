import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  //  /cart , /brands

  const token = await getToken({ req: request });

  const {pathname} = request.nextUrl

//   if (!token){
//     return NextResponse.redirect(new URL("/login", request.url));
//   }else {
//     if(pathname === "/login" || "/register"){
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//   }

  const authPage = ["/login", "/register", "/forgotpassword", "/resetpassword", "/verifyResetCode"]
  const routes = ["/", "/allorders", "/payment", "/brands", "/categories", "/cart", "/productDetails", "/categories", "/wishlist"]

  if( !token && routes.includes(pathname)){
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if(token && authPage.includes(pathname)){
    return NextResponse.redirect(new URL("/", request.url));
  }


  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/forgotpassword", "/resetpassword", "/verifyResetCode", "/allorders", "/brands", "/payment", "/categories", "/cart", "/productDetails", "/login", "/register", "/wishlist"],
};
