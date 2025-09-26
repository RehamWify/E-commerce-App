"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cartContext } from "@/Context/CartContext";
import { cashPaymentAction } from "@/PaymentActions/cashPayment";
import { onlinePaymentAction } from "@/PaymentActions/onlinePayment";
import { useRouter } from "next/navigation";
import React, { useContext, useRef } from "react";
import { BsWallet } from "react-icons/bs";
import { FaCreditCard } from "react-icons/fa";
import { toast } from "sonner";

const Payment = () => {

    const router = useRouter()

    const { cartId, afterPayment } = useContext(cartContext) as {
        cartId: string;
        afterPayment: () => void;
    }


  const details = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);
  const city = useRef<HTMLInputElement>(null);

  async function cashPayment() {
    const values = {
      shippingAddress: {
        details: details.current?.value,
        phone: phone.current?.value,
        city: city.current?.value,
      },
    };

    console.log(values);

    try {
        const data = await cashPaymentAction(cartId, values)

        console.log(data);

        toast.success(data.status , {
            position: "top-center",
            duration: 1000,
        })

        afterPayment()

        router.push("/allorders")
        
    } catch (error) {
        console.log(error);
        
    }


    
  }


  async function onlinePayment() {
    const values = {
      shippingAddress: {
        details: details.current?.value,
        phone: phone.current?.value,
        city: city.current?.value,
      },
    };

    console.log(values);

    try {
        const data = await onlinePaymentAction(cartId, values)

        console.log(data);

        // toast.success(data.status , {
        //     position: "top-center",
        //     duration: 1000,
        // })

        // afterPayment()

        // router.push("/allorders")

        if (data.status === 'success'){
          window.location.href = data.session.url
        }
        
    } catch (error) {
        console.log(error);
        
    }


    
  }


  return (
    <div className="w-full md:w-1/2 my-10 mx-auto px-5 md:px-0 ">
      <h1 className="mb-10 text-center text-3xl font-bold">Payment</h1>

      <div>
        <label htmlFor="details">Details</label>
        <Input ref={details} type="text" id="details" className="mb-4" />

        <label htmlFor="phone">Phone</label>
        <Input ref={phone} type="tel" id="phone" className="mb-4" />

        <label htmlFor="city">City</label>
        <Input ref={city} type="text" id="city" className="mb-5" />

        <Button className="bg-green-600 hover:bg-green-500 cursor-pointer" onClick={cashPayment}>
          <BsWallet className="fill-white text-white" />Cash Payment
        </Button>
        <Button className="bg-green-600 hover:bg-green-500 cursor-pointer ms-5" onClick={onlinePayment}>
          <FaCreditCard />Online Payment
          </Button>
      </div>
    </div>
  );
};

export default Payment;
