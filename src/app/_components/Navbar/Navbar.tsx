"use client";
import Link from "next/link";
import React, { useContext } from "react";
import logo from "./../../../assets/screens/freshcart-logo.svg";
import Image from "next/image";
import {
  FaFacebookF,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import { cartContext } from "@/Context/CartContext";
import { Badge } from "@/components/ui/badge";
import { HiShoppingCart } from "react-icons/hi2";
import { WishlistContext } from "@/Context/WishlistContext";
import { ActiveLink } from "../ActiveLink/ActiveLink";


// static image => <Image src={} alt='' />
// dynamic image  api image => <img src={} alt='' /> or <Image src={} alt='' />
const Navbar = () => {
  const { data: session, status } = useSession();

  const { numOfCartItems } = useContext(cartContext);

  const { wishlistCount }  = useContext(WishlistContext);

  return (
    // backgroud color => #c8ec6d
    <div className="bg-[#c8ec6d]/90 py-5">
      <div className="w-full md:w-[80%] mx-auto flex flex-col md:flex-row justify-between items-center text-center">
        {/* logo && links */}

        <ul className="flex flex-col md:flex-row text-center gap-6 items-center">
          {status === "authenticated" && (
            <>
              <li>
                <Link href={"/"}>
                  <Image src={logo} alt="logo" />
                </Link>
              </li>

              <li className="relative">
                <ActiveLink href={"/cart"}>
                  <HiShoppingCart className="text-2xl" />
                  <Badge className="absolute -top-[70%] h-5 min-w-5 rounded-full px-1 bg-red-600">
                    {numOfCartItems}
                  </Badge>
                </ActiveLink>
              </li>

              <li className="relative">
                <ActiveLink href={"/wishlist"}>Wishlist
                  <Badge className="absolute -top-[70%] h-5 min-w-5 rounded-full px-1 bg-red-600">
                    {wishlistCount}
                  </Badge>
                </ActiveLink>
              </li>

              <li>
                <ActiveLink href={"/categories"}>Categories</ActiveLink>
              </li>

              <li>
                <ActiveLink href={"/allorders"}>All Orders</ActiveLink>
              </li>

              <li>
                <ActiveLink href={"/brands"}>Brands</ActiveLink>
              </li>
            </>
          )}

          {status === "loading" && (
            <>
              <h1>loading .....</h1>
            </>
          )}

          {status === "unauthenticated" && <Image src={logo} alt="logo" />}
        </ul>

        {/* icons && button */}

        <div className="flex flex-col md:flex-row text-center gap-2 items-center">
          <div className="flex gap-4 text-xl ">
            <FaFacebookF />
            <FaYoutube />
            <FaLinkedin />
            <FaTwitter />
          </div>

          {status === "authenticated" && (
            <>
              <div>
                <ActiveLink href={"/login"} >
                  <button
                  className="cursor-pointer"
                  onClick={() =>
                    signOut({
                      callbackUrl: "/login",
                    })
                  }
                >
                  Logout
                </button>
                </ActiveLink>
              </div>

              <div>
                <h1 className="text-green-600 font-semibold text-xl">Hi {session.user.name}</h1>
              </div>
            </>
          )}

          {status === "unauthenticated" && (
            <>
              <div>
                <ActiveLink href={"/login"}>Login</ActiveLink>
              </div>

              <div>
                <ActiveLink href={"/register"}>Register</ActiveLink>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
