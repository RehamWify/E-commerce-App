"use client";
import { cartContext } from "@/Context/CartContext";
import React, { useContext } from "react";
import Loading from "../loading";
import { Button } from "@/components/ui/button";
import { ProductCart } from "@/types/cart.type";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { MdClear } from "react-icons/md"; 
import { MdPayment } from "react-icons/md";


const Cart = () => {
  const { isLoading, products, totalCartPrice, removeCartItem, updateCart, clearCart } = useContext(cartContext) as {
    isLoading: boolean;
    products: ProductCart[];
    totalCartPrice: number;
    removeCartItem: (id: string) => Promise<{ status: string }>;
    updateCart: (id: string, count: number) => Promise<{ status: string }>;
    clearCart: () => void;
  };

  async function removeItem(id: string) {
    const data = await removeCartItem(id);

    console.log(data);

    if (data.status === "success") {
      toast.success("success to remove this product from cart", {
          duration: 1000,
          position: "top-center",
        });
        
    } else {
      toast.error("failed to remove this product in cart", {
          duration: 1000,
          position: "top-center",
        });
    }
  }

  async function updateCartItem(id: string, count: number) {
    const data = await updateCart(id, count);

    console.log(data);

    if (data.status === "success") {
      toast.success("success to update this product from cart", {
          duration: 1000,
          position: "top-center",
        });
    } else {
      toast.error("failed to update this product in cart",
        {
          duration: 1000,
          position: "top-center",
        });
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  if (products.length == 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-red-600 text-3xl font-bold">
          No Data to Display it
        </h1>
      </div>
    );
  }

  return (

    <div className="w-full md:w-[80%] mx-auto my-10 px-5 md:px-0">
      <div className="p-5">
        <h1 className="text-2xl font-semilight">Shop Cart :</h1>

        <p className="my-3 text-green-600 font-mono">
          Total Price : {totalCartPrice} EGP
        </p>

        <Button variant="destructive" onClick={clearCart} className="mb-10">
          <MdClear />Clear Cart
        </Button>

        <Button className="mb-10 ms-5  bg-green-600 hover:bg-green-500">
          <MdPayment />
          <Link href={"/payment"}>Payment</Link>
        </Button>

        <div className="allProducts">
          {products.map(function (product: ProductCart, idx: number) {
            return (
              <Card className="w-full shadow-lg hover:shadow-2xl rounded-2xl mb-5" key={idx}>
                <CardContent>
              <div
                key={idx}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-5">
                  <div className="">
                    <Image
                      src={product.product.imageCover}
                      alt={product.product.title}
                      height={200}
                      width={200}
                    />
                  </div>

                  <div>
                    <h2>{product.product.title}</h2>

                    <p className="my-3 text text-green-500">
                      Price : {product.price} EGP
                    </p>

                    <Button variant="destructive" onClick={() => removeItem(product.product.id)}>
                      <Trash2 />Remove
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    onClick={ () => updateCartItem(product.product.id, product.count + 1)
                    }
                    className="hover:bg-green-500 hover:text-white text-green-500 bg-white  border-[1px] border-green-500"
                  >
                    +
                  </Button>
                  <p>{product.count}</p>
                  <Button
                    onClick={() =>
                      updateCartItem(product.product.id, product.count - 1)
                    }
                    className="hover:bg-green-500 hover:text-white text-green-500 bg-white  border-[1px] border-green-500"
                  >
                    -
                  </Button>
                </div>
              </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>


    // <div className="w-full md:w-[80%] mx-auto my-10 px-5 md:px-0">
    //   <div className="p-5">
    //     <h1 className="text-2xl font-semilight">Shop Cart :</h1>

    //     <p className="my-3 text-green-600 font-mono">
    //       Total Price : {totalCartPrice} EGP
    //     </p>

    //     <Button variant="destructive" onClick={clearCart} className="mb-10">
    //       <HiTrash/>Clear Cart
    //     </Button>

    //     <Button  className="mb-10 ms-5  bg-green-600 hover:bg-green-500">
    //       <Link href={"/payment"}>Payment</Link>
    //     </Button>

    //     <div className="allProducts">
    //       {products.map(function (product: ProductCart, idx: number) {
    //         return (
    //           <div
    //             key={idx}
    //             className="flex items-center justify-between py-3 border-b-[1px] border-green-500/35"
    //           >
    //             <div className="flex items-center gap-5">
    //               <div className="">
    //                 <Image
    //                   src={product.product.imageCover}
    //                   alt={product.product.title}
    //                   height={200}
    //                   width={200}
    //                 />
    //               </div>

    //               <div>
    //                 <h2>{product.product.title}</h2>

    //                 <p className="my-3 text text-green-500">
    //                   Price : {product.price} EGP
    //                 </p>

    //                 <Button variant="destructive" onClick={() => removeItem(product.product.id)}>
    //                   Remove
    //                 </Button>
    //               </div>
    //             </div>

    //             <div className="flex items-center gap-3">
    //               <Button
    //                 onClick={ () => updateCartItem(product.product.id, product.count + 1)
    //                 }
    //                 className="hover:bg-green-500 hover:text-white text-green-500 bg-white  border-[1px] border-green-500"
    //               >
    //                 +
    //               </Button>
    //               <p>{product.count}</p>
    //               <Button
    //                 onClick={() =>
    //                   updateCartItem(product.product.id, product.count - 1)
    //                 }
    //                 className="hover:bg-green-500 hover:text-white text-green-500 bg-white  border-[1px] border-green-500"
    //               >
    //                 -
    //               </Button>
    //             </div>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   </div>
    // </div>
  );
};

export default Cart;
