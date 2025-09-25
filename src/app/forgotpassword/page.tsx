"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Mail } from "lucide-react"
// import axios from "axios"
// import { toast } from "sonner"
// // import { forgotPasswords } from "@/apis/forgotPasswords"

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("")
//   const [message, setMessage] = useState("");
//   // const [submitted, setSubmitted] = useState(false)

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault()
// //     if (!email) return
// //     setSubmitted(true)

// //     // ✅ Here you would call your API to send reset link
// //     console.log("Reset password link sent to:", email)
// //   }

// //   async function handleForgotPassword(email: string){
// //     const data = await forgotPasswords(email)

// //     console.log(data);

// //   }


// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault()

//   // if (!email) return

//   // // setSubmitted(true)

//   //   // ✅ Here you would call your API to send reset link
//   //   console.log("Reset password link sent to:", email)

//   try {

// //     const values = {
// //     email: email
// // }
//     // ✅ Call your API route or backend
//     const response = await  axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {email})

//     setMessage(response.data.message)
//     toast.success(response.data.message)

//     if (!response.data.message) throw new Error("Something went wrong")
    
//     // setSubmitted(true)
//   } catch (error) {
//     // console.log(error)
//     // Optionally show a toast error message here
//     setMessage(error.response.data.message)
//     toast.error(error.response.data.message)
//   }
// }


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="w-full max-w-md"
//       >
//         <Card className="shadow-xl rounded-2xl">
//           <CardHeader className="text-center">
//             <CardTitle className="text-2xl font-bold">
//               Forgot Password
//             </CardTitle>
//             <p className="text-sm text-gray-500 mt-1">
//               Enter your email to receive a password reset link.
//             </p>
//           </CardHeader>

//           <CardContent>
//             {!message ? (
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email address</Label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                     <Input
//                       id="email"
//                       type="email"
//                       placeholder="you@example.com"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="pl-10"
//                       required
//                     />
//                   </div>
//                 </div>
//                 <Button type="submit" className="w-full">
//                   Send Reset Link
//                 </Button>
//               </form>
//             ) : (
//               <div className="text-center space-y-4 py-6">
//                 <div className="flex justify-center">
//                   <Mail className="h-10 w-10 text-green-500" />
//                 </div>
//                 <p className="text-gray-700">
//                   If an account exists with <span className="font-medium">{email}</span>, 
//                   we’ve sent a password reset link.
//                 </p>
//                 <Button
//                   variant="outline"
//                   className="w-full"
                  
//                 >
//                   Go Back
//                 </Button>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </motion.div>
//     </div>
//   )
// }


// import { useState } from "react";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage(data.message || "✅ Check your Gmail inbox for a reset link.");
//       } else {
//         setMessage(data.error || "❌ Email not found.");
//       }
//     } catch (error) {
//       setMessage("❌ Network error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
//         <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Enter your Gmail address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 border rounded-lg"
//             required
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
//           >
//             {loading ? "Sending..." : "Send Reset Link"}
//           </button>
//           <Link href={"/verifyResetCode"} className="text-blue-600 underline"> Reset Code </Link>
//         </form>
//         {message && <p className="text-center mt-3">{message}</p>}
//       </div>
//     </div>
//   );
// }


import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "✅ Check your Gmail inbox for a reset link.");
        setTimeout(() => router.push("/verifyResetCode"), 2000);
      } else {
        setMessage(data.message || "❌ Email not found.");
      }
    } catch (error) {
      setMessage("❌ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your Gmail address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-500 disabled:bg-gray-400"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>

          <Link href={"/verifyResetCode"} className="text-blue-600 underline">
            Reset Code
          </Link>
        </form>
        {message && <p className="text-center mt-3">{message}</p>}
      </div>
    </div>
  );
}


