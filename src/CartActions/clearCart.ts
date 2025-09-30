"use server"

import { getMyToken } from "@/utilities/token"
import axios from "axios"

export async function clearCartAction(){
    
    const token = await getMyToken()

    if (!token){
        throw new Error("Login First")
    }

    const {data} = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        headers: {
            token: token as string
        }
    })

    return data
}