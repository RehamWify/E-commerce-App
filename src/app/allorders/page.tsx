"use server";
import { getUserOrder } from "@/apis/getUserOrders";
import { Card, CardContent } from "@/components/ui/card";
import { CartItem, Order, Orders } from "@/types/order.type";
import Image from "next/image";
import React from "react";
import StatusMonitor from "../_components/StatusMonitor/StatusMonitor";

// const statuses = [
//   { value: "online", label: "Online" },
//   { value: "offline", label: "Offline" },
//   { value: "pending", label: "Pending" },
// ];

const AllOrders = async () => {
  const data: Orders = await getUserOrder();

  console.log(data);

  return (
    // <div className='md:w-[80%] mx-auto w-full my-10 px-5 md:px-0 '>

    //   <div className='allOrders'>

    //     {data.map( function (order: Order , idx: number){return <div className='p-5 bg-slate-100 mb-5' key={idx} >

    //       <div className='flex border-b-[1px] border-green-700/35 pb-5'>

    //         {order.cartItems.map( function (item: CartItem , idx: number) { return <div className='w-1/6 me-3' key={idx} >

    //           <Image src={item.product.imageCover}  alt={item.product.title} width={200} height={200} className='w-full'/>

    //           <h2 className='line-clamp-1'>{item.product.title}</h2>
    //         </div>})}

    //       </div>

    //         <div className='mt-5'>
    //           <h2>Payment Method Type : {order.paymentMethodType} </h2>
    //           <h2>Total Order Price : {order.totalOrderPrice} EGP</h2>
    //         </div>

    //         {/* <Combobox
    //           items={orderStatusOptions}
    //           placeholder="Filter by status"
    //           onSelect={handleStatusSelect}
    //         /> */}

    //     </div>})}

    //   </div>
    // </div>

    <div className="md:w-[80%] mx-auto w-full my-10 px-5 md:px-0 ">
      <div className="allOrders">
        {data.map(function (order: Order, idx: number) {
          return (
            <Card
              className="w-full shadow-lg hover:shadow-2xl rounded-2xl mb-8"
              key={idx}
            >
              <CardContent>
                <div className="p-5 mb-5" key={idx}>
                  <div className="flex border-b-[2px] border-green-600 pb-5">
                    {order.cartItems.map(function (
                      item: CartItem,
                      idx: number
                    ) {
                      return (
                        <div className="me-3" key={idx}>
                          <Image
                            src={item.product.imageCover}
                            alt={item.product.title}
                            width={200}
                            height={200}
                            className="w-1/3"
                          />

                          <h2 className="line-clamp-1">{item.product.title}</h2>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-between items-end ">
                    <div>
                      <h2>Payment Method Type : {order.paymentMethodType} </h2>
                      <h2 className="text-green-500">
                        Total Order Price : {order.totalOrderPrice} EGP
                      </h2>
                    </div>
                    <div className="mt-5">
                      <StatusMonitor defaultStatus={""} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AllOrders;
