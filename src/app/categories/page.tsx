import React from 'react'
import getAllCategories from '@/apis/allCategories'
import { Category } from '@/types/category.type'
import Link from 'next/link'
import Image from 'next/image'

const Categories = async () => {

  const data : Category[] = await getAllCategories()

  console.log(data);
  
  return (
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Our Categories</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data.map((category: Category) => (
              <Link key={category._id} href={`/categories/${category._id}`}>
                <div className="bg-white shadow rounded-2xl p-4 hover:shadow-2xl hover:cursor-pointer transition">
                  <Image
                    priority
                    width={200}
                    height={200}
                    src={category.image}
                    alt={category.name}
                    className="h-20 mx-auto object-contain mb-4"
                  />
                  <h2 className="text-xl font-semibold text-center">{category.name}</h2>
                  
                </div>
              </Link>
            ))}
          </div>
        </div>
  );
}

export default Categories