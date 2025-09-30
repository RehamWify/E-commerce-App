"use server"

import { getMyToken } from "@/utilities/token"

export async function getUserCartAction (){
    const token = await getMyToken()

    if (!token){
        throw new Error("Login First")
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        headers: {
            token: token as string
        }
    })

    const data = await response.json()


    return data
}