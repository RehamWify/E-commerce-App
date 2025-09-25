
// import getAllBrands from '@/apis/allBrands';
// import { Brand } from '@/types/brand.type';
// import React from 'react'
// import BrandCard from '../BrandCard/page';

// const Brands = async () => {


//    const data: Brand [] = await getAllBrands();
  
//     console.log(data);
//   return (
//     //  <div className="p-6">
//     //   <h1 className="text-3xl font-bold mb-6 text-center">Our Brands</h1>

//     //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//     //     {data.map((brand: Brand) => (
//     //       <>
//     //       <Link key={brand._id} href={`/brands/${brand._id}`}>
//     //         <div
//     //         key={brand._id}
//     //         className="bg-white shadow rounded-2xl p-4 hover:shadow-2xl transition"
//     //       >
//     //         <Image
//     //           src={brand.image}
//     //           alt={brand.name}
//     //           width={500} 
//     //           height={500}
//     //           className="h-20 mx-auto object-contain mb-4"
//     //         />
//     //         {/* <p className="text-gray-600 text-center">{brand.slug}</p> */}
            
//     //         <h2 className="text-xl font-semibold text-center">{brand.name}</h2>
//     //       </div>
//     //         </Link>
//     //       </>

//     //     ))}
//     //   </div>
//     // </div>

//     <section className="w-full md:w-[80%] mx-auto my-10 px-5 md:px-0">
//           <div className="flex  flex-wrap">
//             {data.map((brand: Brand) => <BrandCard key={brand._id} brand={brand} />)}
//           </div>
//         </section>
//   );
// }

// export default Brands






import getAllBrands from "@/apis/allBrands";
import { Brand } from "@/types/brand.type";
import Image from "next/image";
import Link from "next/link";

export default async function Brands() {
  

    const data: Brand [] = await getAllBrands();
  
      console.log(data);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Brands</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((brand: Brand) => (
          <Link key={brand._id} href={`/brands/${brand._id}`}>
            <div className="bg-white shadow rounded-2xl p-4 hover:shadow-2xl hover:cursor-pointer transition">
              <Image
                priority
                width={500}
                height={500}
                src={brand.image}
                alt={brand.name}
                className="h-20 mx-auto object-contain mb-4"
              />
              <h2 className="text-xl font-semibold text-center">{brand.name}</h2>
              {/* <p className="text-gray-600 text-center">{brand.description}</p> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

