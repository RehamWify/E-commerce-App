"use client";
import React from "react";
import banner1 from "../../../assets/screens/slider/grocery-banner.png";
import banner2 from "../../../assets/screens/slider/grocery-banner-2.jpeg";

import slide1 from "../../../assets/screens/slider/slider-image-1.jpeg";
import slide2 from "../../../assets/screens/slider/slider-image-2.jpeg";
import slide3 from "../../../assets/screens/slider/slider-image-3.jpeg";
import Image from "next/image";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import {
  Autoplay,
  Navigation,
  Pagination,
  A11y
} from "swiper/modules";

const MainSlider = () => {
  return (
    <div className="mb-10 flex ">
      <div className="w-full md:w-2/3">
        <Swiper 
          modules={[Autoplay , Navigation, Pagination, A11y]}
          spaceBetween={0}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          // pagination={{
          // clickable: true,
          // }}
        >
          <SwiperSlide>
            <Image
              className="h-[400px] object-cover"
              src={slide1}
              alt="slide1"
            />
          </SwiperSlide>

          <SwiperSlide>
            <Image
              className="h-[400px] object-cover"
              src={slide2}
              alt="slide2"
            />
          </SwiperSlide>

          <SwiperSlide>
            <Image
              className="h-[400px] object-cover"
              src={slide3}
              alt="slide3"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="w-1/3">
        <Image
          className="h-[200px] object-cover"
          src={banner1}
          alt="Image of grocery banner1"
        />
        <Image
          className="h-[200px] object-cover"
          src={banner2}
          alt="Image of grocery banner2"
        />
      </div>
    </div>
  );
};

export default MainSlider;
