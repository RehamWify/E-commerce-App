
"use client";
// import { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Link from "next/link";

// export default function VerifyResetCode() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const emailFromQuery = searchParams.get("email");

//   const [email] = useState(emailFromQuery || "");
//   const [code, setCode] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleVerify = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ resetCode: code }), // ✅ only send code
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage("✅ Code verified! Redirecting...");
//         setTimeout(() => {
//           router.push(`/resetpassword?email=${encodeURIComponent(email)}`);
//         }, 1500);
//       } else {
//         setMessage(data.message || "❌ Invalid or expired code.");
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
//         <h1 className="text-2xl font-bold text-center mb-6">Verify Reset Code</h1>
//         <form onSubmit={handleVerify} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Enter reset code"
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//             className="w-full p-3 border rounded-lg"
//             required
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
//           >
//             {loading ? "Verifying..." : "Verify Code"}
//           </button>

//           <Link href="/resetpassword" className="text-blue-600 underline">
//             Reset Password
//           </Link>
//         </form>
//         {message && <p className="text-center mt-3">{message}</p>}
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function VerifyResetCode() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email"); // email from forgot password page if passed

  const [email, setEmail] = useState(emailFromQuery || "");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resetCode: code }), // ✅ API expects resetCode only
        }
      );

      const data = await res.json();

      if (res?.ok) {
        setMessage("✅ Code verified! Redirecting to reset password...");
        // ✅ Pass email in query string to ResetPassword page
        setTimeout(() => {
          router.push(`/resetpassword?email=${encodeURIComponent(email)}`);
        }, 1500);
      } else {
        setMessage(data.message || "❌ Invalid or expired code.");
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
        <h1 className="text-2xl font-bold text-center mb-6">Verify Reset Code</h1>
        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Enter reset code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-500 disabled:bg-gray-400"
          >
            {loading ? "Verifying..." : "Verify Code"}
          </Button>
          <Link href={"/resetpassword"} className="text-blue-600 underline">
            Reset Password
          </Link>
        </form>
        {message && <p className="text-center mt-3">{message}</p>}
      </div>
    </div>
  );
}

