import { Product } from "@/types/product.type";

// Get the base URL from the environment variables
const BASE_URL = process.env.API;

export default async function getAllProducts() {
  // ✅ CHANGE 2: Use the dynamic absolute URL
  const response = await fetch(`${BASE_URL}/api/users`);
  const { data } : {data: Product []} = await response.json();
  
  return data;
}