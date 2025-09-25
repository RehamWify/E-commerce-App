"use client"
import React from "react";
import { SessionProvider } from 'next-auth/react';
import CartContextProvider from "./Context/CartContext";
import WishlistContextProvider from "./Context/WishlistContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <div>
    <SessionProvider>
      <CartContextProvider>
        <WishlistContextProvider>
        {children}
        </WishlistContextProvider>
      </CartContextProvider>
    </SessionProvider>
  </div>;
};

export default Providers;
