"use client";

import { Button } from "@/components/ui/button";
import { cartContext } from "@/Context/CartContext";
import { CheckCircleIcon } from "lucide-react";
import React, { useContext } from "react";
import { HiShoppingCart } from "react-icons/hi2";
import { toast } from "sonner";

 const AddBtnCart = ({ id }: { id: string }) => {


  const { addProductToCart } = useContext(cartContext) as {
    addProductToCart: (id: string) => Promise<{ status: string }>;
  }



  async function handleAddCart() {
    const data = await addProductToCart(id);

    // console.log(data);
    if(data.status === "success"){
      toast.success(data.status, {
        duration: 1000,
        position: "top-center",
        icon: <CheckCircleIcon className="text-green-500" />
      });
    }

    else{
      toast.error("failed to add this product in cart", {
        duration: 1000,
        position: "top-center",
        icon: <CheckCircleIcon className="text-red-500" />
    })
    
  }
}

  return (
    <div>
      <Button className="w-full bg-green-600 hover:bg-green-500 text-white" variant="default" onClick={handleAddCart}>
        <HiShoppingCart className="h-8 w-8 text-white" /> Add To Cart 
      </Button>
    </div>
  );

 };

export default AddBtnCart;
