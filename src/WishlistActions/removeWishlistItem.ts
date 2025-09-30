"use server"

import { getMyToken } from "@/utilities/token"
import axios from "axios"

export async function removeWishlistItemAction(id: string){

    const token = await getMyToken()

    if(!token){
        throw new Error("Login First")
    }

    const {data} = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/wishlist/${id}`, {
        headers: {
            token: token as string
        }
    })

    return data
}
