"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function ConfirmationPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard"); // Redirect to dashboard after 3 seconds
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <div className="text-center p-8 bg-[#1a1a1a] rounded-lg shadow-lg">
        <CheckCircle className="w-16 h-16 text-[#fa5f02] mx-auto mb-4" />
        <h1 className="text-2xl font-semibold">IP Registered Successfully!</h1>
        <p className="text-sm text-gray-400 mt-2">Redirecting to Dashboard...</p>
        
        {/* Button to manually go back */}
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-4 px-6 py-2 bg-[#fa5f02] text-black font-medium rounded hover:bg-[#d94e00] transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
