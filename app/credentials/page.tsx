"use client"

import { useState, useEffect } from "react"
import { Search, Home, FileText, FileKey, Users, BarChart2, Shield, Settings, HelpCircle } from "lucide-react"

export default function Credentials() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-64 border-r border-[#333333]">
        <div className="p-4 space-y-2">
          {/* Search */}
          <div className="flex items-center gap-3 p-3 rounded-md bg-[#1a1a1a]">
            <Search className="w-5 h-5 text-[#888888]" />
            <span className="text-[#888888]">Search</span>
          </div>

          {/* Navigation Items */}
          <NavItem icon={<Home />} label="Dashboard" />
          <NavItem icon={<FileText />} label="Register IP" />
          <NavItem icon={<FileKey />} label="Generate ZPK" />
          <NavItem icon={<Users />} label="Collaborations" />
          <NavItem icon={<BarChart2 />} label="Analytics" />
          <NavItem icon={<Shield />} label="Credentials" active />
          <NavItem icon={<Settings />} label="Settings" />
          <NavItem icon={<HelpCircle />} label="Help" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-center">
            <span className="text-[#fa5f02]">CREATOR</span> CREDENTIALS
          </h1>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-4 gap-6 mb-10 max-w-4xl mx-auto">
          <img src="/images/copper.png" alt="Copper Badge" className="w-[175px] h-[202px]" />
          <img src="/images/silver.png" alt="Silver Badge" className="w-[175px] h-[202px]" />
          <img src="/images/gold.png" alt="Gold Badge" className="w-[175px] h-[202px]" />
          <img src="/images/locked.png" alt="Locked Badge" className="w-[175px] h-[202px]" />
        </div>

        {/* Credential Details */}
        <div className="max-w-4xl mx-auto p-6 border border-[#444444] rounded-tl-[42px] rounded-tr-[42px] rounded-bl-[32px] rounded-br-[32px] flex items-start justify-between">
          <div>
            <div className="flex items-center gap-6">
              {/* Badge Image */}
              <div className="w-24 h-24 flex items-center justify-center overflow-hidden rounded-lg">
                <img src="/images/Diamond.png" alt="Copper Badge" className="w-full h-full object-cover" />
              </div>

              {/* Credential Info */}
              <div className="flex-1 text-left">
                <h3 className="text-[27px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#b87333] via-[#d99a6c] to-[#a45a2a]" style={{ textShadow: "0px 1.264px 25.11px rgba(255, 255, 255, 0.25), 0px 1.264px 21.09px rgba(203, 218, 230, 0.50)", fontFamily: 'DM Sans' }}>
                  Copper Creator
                </h3>
                <p className="text-xs text-[#888888]">25+ IP Assets Registered</p>
                <p className="text-xs text-[#888888]">Earned on January 15, 2025</p>
              </div>
            </div>

            {/* Verification Information */}
            <div className="space-y-3 mt-6 text-left">
              <div>
                <h4 className="text-sm font-medium">Verification Information</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-[#888888]">Issuer:</p>
                    <p>Privado ID</p>
                  </div>
                  <div>
                    <p className="text-[#888888]">Verification Method:</p>
                    <p>Story Protocol API</p>
                  </div>
                  <div>
                    <p className="text-[#888888]">Date Issued:</p>
                    <p>January 15, 2025</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium">Transaction Hash</h4>
                <p className="text-xs font-mono text-[#888888] break-all">
                  0x72f9eb41a099fd3f5c45f716a3dcc37464a293f863bd4cff6fa1e9f831b74e43
                </p>
              </div>
            </div>
          </div>

          {/* Verify Button */}
          <div className="flex items-start">
            <button className="px-6 py-2 text-sm font-semibold text-[#fa5f02] border border-[#fa5f02] rounded-full hover:bg-[#fa5f02]/10">
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Sidebar Navigation Item Component
function NavItem({ icon, label, active = false }) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-md ${active ? "bg-[#1a1a1a]" : "hover:bg-[#1a1a1a]/50"}`}>
      <div className="w-5 h-5 text-[#888888]">{icon}</div>
      <span className={active ? "font-medium" : "text-[#888888]"}>{label}</span>
    </div>
  )
}
