"use client";
import Image from "next/image";
import React from "react";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// import slide1 from "../../../assets/screens/slider/slider-image-1.jpeg";
// import slide2 from "../../../assets/screens/slider/slider-image-2.jpeg";
// import slide3 from "../../../assets/screens/slider/slider-image-3.jpeg";
import { Category } from "@/types/category.type";
import Link from "next/link";

const SwiperCategory = ({ categories }: { categories: Category[] }) => {
  /*
    Image
    static => Image next => change any extension to webp => src , alt
    
    API => img 
    */

  return (
    <div>
      <h2 className="font-sans text-3xl text-gray-600 mb-3">
        Shop Popular Categories
      </h2>
      <Swiper 
        modules={[Autoplay, Navigation, Pagination, A11y]}
        spaceBetween={0}
        slidesPerView={5}
  breakpoints={{
    320: { // for mobile
      slidesPerView: 1,
      spaceBetween: 5,
    },
    640: { // small tablets
      slidesPerView: 2,
      spaceBetween: 10,
    },
    1024: { // desktops
      slidesPerView: 4,
      spaceBetween: 15,
    },
    1280: { // large screens
      slidesPerView: 5,
      spaceBetween: 20,
    },
  }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        // loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        // //   navigation
        // pagination={{ clickable: true }}
      >
        {categories.map((category : Category) => (
          <SwiperSlide key={category._id}>
            <Link key={category._id} href={`/categories/${category._id}`}>
            <Image
              width={500}
              height={500}
              src={category.image}
              alt={category.name}
              className="h-[200px] object-cover w-full"
              />
            <p className="my-3 text-center text-green-600">{category.name}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperCategory;
