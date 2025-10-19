"use server"

import { getMyToken } from "@/utilities/token";
import axios from "axios";


export async function onlinePaymentAction(id: string , values: object){

    const token = await getMyToken()

    if (!token){
        throw new Error("Login First")
    }

    const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${process.env.NEXTAUTH_URL}` || `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://e-commerce-app-cgyn.vercel.app` , values , {
        headers: {
            token: token as string
        }
    })

    return data

}