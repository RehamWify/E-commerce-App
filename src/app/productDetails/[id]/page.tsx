import getSingleProduct from "@/apis/singleProduct";
import AddBtnCart from "@/app/_components/AddBtnCart/AddBtnCart";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { HiStar } from "react-icons/hi2";

const ProductDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  console.log(id);

  const data = await getSingleProduct(id);

  console.log(data);

  return (
    <div className="w-full px-5 md:w-[80%] md:px-0 mx-auto my-10 flex items-center flex-col md:flex-row">
      <div className="w-full md:w-1/3">
        <Image width={500} height={500} src={data.imageCover} className="w-full" alt={data.title} />
      </div>
      <div className="w-full md:w-2/3 m-10 md:m-0 ps-10 ">
        <h2 className="text-2xl text-green-600 font-bold">{data.title}</h2>
        <p className="my-5">{data.description}</p>
        <p className="">{data.category.name}</p>

        <div className="w-full my-5 flex justify-between items-center">
          <p>{data.price} EGP</p>
          <div className="flex items-center gap-1">
            <p>{data.ratingsAverage}</p>
            <HiStar className="text-yellow-300"/>
          </div>
        </div>
          <AddBtnCart id={data.id}/>
      </div>
    </div>
  );
};

export default ProductDetails;
