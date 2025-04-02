"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowLeft, Copy, Check } from "lucide-react";
import Link from "next/link";

export default function Confirmation() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [registrationId, setRegistrationId] = useState<string>("");
  const [timestamp, setTimestamp] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from server or retrieving from sessionStorage
    // In a real app, you might get this from API/context/redux
    const storedId = sessionStorage.getItem('registrationId');
    const storedTimestamp = sessionStorage.getItem('registrationTimestamp');
    
    if (storedId && storedTimestamp) {
      setRegistrationId(storedId);
      setTimestamp(new Date(storedTimestamp).toLocaleString());
    } else {
      // Fallback if data isn't available
      setRegistrationId("ZPK-2025-03-31-9382");
      setTimestamp(new Date().toLocaleString());
    }
    
    // Simulate loading state
    setTimeout(() => setIsLoading(false), 600);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(registrationId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-[#121212] text-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-[#fa5f02] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-400">Loading confirmation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#121212] text-white flex items-center justify-center">
      <div className="w-full max-w-lg px-6 py-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <Link href="/" className="flex items-center gap-2 text-[#fa5f02] hover:text-[#fa5f02]/80 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
        </div>

        {/* Content */}
        <div className="bg-[#1a1a1a] rounded-2xl p-8 shadow-lg border border-[#333]">
          <div className="text-center space-y-8">
            {/* Success Icon */}
            <div className="relative inline-flex">
              <div className="w-24 h-24 rounded-full bg-[#fa5f02]/10 flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-[#fa5f02]" />
              </div>
              <div className="absolute -inset-1 rounded-full border-2 border-[#fa5f02]/30 animate-pulse" />
            </div>
            
            {/* Message */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight">Registration Successful</h1>
              <p className="text-gray-400 text-lg">Your intellectual property has been securely registered in our system.</p>
            </div>
            
            {/* Details */}
            <div className="bg-[#252525] rounded-lg p-4 text-left">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Registration ID</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[#fa5f02]">{registrationId}</span>
                  <button 
                    onClick={copyToClipboard}
                    className="p-1.5 rounded-md bg-[#333] hover:bg-[#444] transition-colors"
                    aria-label="Copy registration ID"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Timestamp</span>
                <span className="font-mono">{timestamp}</span>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="pt-4">
              <Link href="/" className="inline-flex items-center justify-center px-6 py-3 bg-[#fa5f02] text-white rounded-lg font-medium hover:bg-[#fa5f02]/90 transition-colors">
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="flex flex-wrap justify-center gap-8">
            <Link href="/register" className="text-gray-400 hover:text-white transition-colors text-sm">Register Another</Link>
            <Link href="/credentials" className="text-gray-400 hover:text-white transition-colors text-sm">View Credentials</Link>
            <Link href="/help" className="text-gray-400 hover:text-white transition-colors text-sm">Help Center</Link>
          </div>
        </div>
      </div>
    </div>
  );
}