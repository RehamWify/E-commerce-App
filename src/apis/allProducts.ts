import { Product } from "@/types/product.type";



export default async function getAllProducts() {
    // Get the base URL from the environment variables
    const response = await fetch(`${process.env.API}/products`);
    const { data } : {data: Product []} = await response.json();
    
    return data;
}