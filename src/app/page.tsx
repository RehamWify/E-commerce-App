"use server";
import getAllProducts from "@/apis/allProducts";
import HomeCard from "./_components/HomeCard/HomeCard";
import MainSlider from "./_components/MainSlider/MainSlider";
import CategorySlide from "./_components/CategorySlide/CategorySlide";
import { Product } from "@/types/product.type";

export default async function Home() {
  // ssr => don't use any hook like useEffect , useState

  // call api
  const data: Product[] = await getAllProducts();

  console.log(data);
  

  /*
  ssr =>server side rendering
  ssg => static site generation
  isr => incremental static regeneration
  */

  return (
    <section className="w-full md:w-[80%] mx-auto my-10 px-5 md:px-0">
      <MainSlider />
      <CategorySlide />
      <div className="flex  flex-wrap">
        {data.map((product: Product, idx: number) => <HomeCard key={idx} product={product} />)}
      </div>
    </section>
  );
}
