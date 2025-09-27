// ✅ Solution: Add robust error handling
import { Product } from "@/types/product.type";

export default async function getAllProducts() {
    try {
        // Use the relative path for internal API:
        const response = await fetch(`/api/users`);
        
        // 🚨 IMPORTANT: Check the response status *before* calling .json()
        if (!response.ok) {
            // Throw an error if the HTTP status is 4xx or 5xx
            throw new Error(`API fetch failed with status: ${response.status}`);
        }

        const { data } : {data: Product []} = await response.json();
        return data;

    } catch (error) {
        console.error("Failed to fetch products for prerendering:", error);
        // Return an empty array or throw a more specific error, but DON'T crash the worker.
        return []; 
    }
}