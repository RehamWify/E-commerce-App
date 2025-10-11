"use client";
// import { useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import Link from "next/link";

// export default function ResetPassword() {
//   const searchParams = useSearchParams();
//   const token = searchParams.get("token");
//   const router = useRouter();

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       return setMessage("❌ Passwords do not match.");
//     }

//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage("✅ Password reset successful! Redirecting to login...");
//         setTimeout(() => router.push("/login"), 2000);
//       } else {
//         setMessage(data.error || "❌ Token expired or invalid.");
//       }
//     } catch (error) {
//       setMessage("❌ Network error. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
//         <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="password"
//             placeholder="New Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 border rounded-lg"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="w-full p-3 border rounded-lg"
//             required
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
//           >
//             {loading ? "Resetting..." : "Reset Password"}
//           </button>

//           <Link href={"/login"} className="text-blue-500">Login</Link>
//         </form>
//         {message && <p className="text-center mt-3">{message}</p>}
//       </div>
//     </div>
//   );
// }


// "use client";
// import { useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import Link from "next/link";

// export default function ResetPassword() {
//   const searchParams = useSearchParams();
//   const email = searchParams.get("email"); // ✅ get email from query
//   const router = useRouter();

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       return setMessage("❌ Passwords do not match.");
//     }

//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
//         method: "PUT", // ✅ Must use PUT as per API docs
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, newPassword: password }), // ✅ send email + newPassword
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage("✅ Password reset successful! Redirecting to login...");
//         setTimeout(() => router.push("/login"), 2000);
//       } else {
//         setMessage(data.message || "❌ Something went wrong.");
//       }
//     } catch (error) {
//       setMessage("❌ Network error. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
//         <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="password"
//             placeholder="New Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 border rounded-lg"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="w-full p-3 border rounded-lg"
//             required
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
//           >
//             {loading ? "Resetting..." : "Reset Password"}
//           </button>

//           <Link href={"/login"} className="text-blue-500">Login</Link>
//         </form>
//         {message && <p className="text-center mt-3">{message}</p>}
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email"); // ✅ Get email from query
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setMessage("❌ Passwords do not match.");
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        method: "PUT", // ✅ API expects PUT
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword: password }), // ✅ Correct payload
      });

      const data = await res.json();

      if (res?.ok) {
        setMessage("✅ Password reset successful! Redirecting to login...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setMessage(data.message || "❌ Something went wrong.");
      }
    } catch (error) {
      setMessage("❌ Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          {/* <Link href="/login" className="text-blue-500 block text-center">
            Back to Login
          </Link> */}
        </form>
        {message && <p className="text-center mt-3">{message}</p>}
      </div>
    </div>
  );
}



