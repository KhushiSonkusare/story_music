"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Home,
  FileText,
  FileKey,
  Users,
  BarChart2,
  Shield,
  Settings,
  HelpCircle,
  Heart,
  Play,
  Plus,
} from "lucide-react";

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex bg-black text-white min-h-screen">
      {/* Sidebar (Fixed Left) */}
      <div className="w-64 border-r border-[#333333] p-4 fixed left-0 top-0 h-screen">
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-3 rounded-md bg-[#1a1a1a]">
            <Search className="w-5 h-5 text-[#888888]" />
            <span className="text-[#888888]">Search</span>
          </div>
          <NavItem icon={<Home />} label="Dashboard" active />
          <NavItem icon={<FileText />} label="Register IP" />
          <NavItem icon={<FileKey />} label="Generate ZPK" />
          <NavItem icon={<Users />} label="Collaborations" />
          <NavItem icon={<BarChart2 />} label="Analytics" />
          <NavItem icon={<Shield />} label="Credentials" />
          <NavItem icon={<Settings />} label="Settings" />
          <NavItem icon={<HelpCircle />} label="Help" />
        </div>
      </div>

      {/* Main Content (Scrollable Center) */}
      <div className="flex-1 ml-64 mr-96 p-8 h-screen overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="mb-8">
          <h1 className="text-3xl font-medium">Hello, Michael!</h1>
        </div>

        {/* Featured Content */}
        <div className="relative mb-10 overflow-hidden rounded-3xl bg-[#ea623a] p-12 flex justify-between items-center h-80">
          {/* Left Content */}
          <div className="space-y-6 max-w-[60%]">
            <div className="text-sm font-medium">Recent IP</div>
            <h2 className="text-6xl font-bold">DIE FOR YOU</h2>
            <div className="text-sm space-y-2">
              <p>Genre: R&B Music</p>
              <p>Collaborations:</p>
            </div>
            <div className="flex items-center gap-4 mt-12">
              <Heart className="w-5 h-5" />
              <span className="font-medium">50,851 Likes</span>
              <span className="ml-8 font-medium">2.1 M Monthly Listeners</span>
            </div>
          </div>

          {/* Right Image */}
          <div className="h-full flex justify-end">
            <img
              src="/images/week.png"
              alt="DIE FOR YOU Cover"
              className="h-full w-auto object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <StatCard color="green" number="25" label="Registered IP assets" />
          <StatCard color="purple" number="3" label="Creator Credentials" />
          <StatCard color="blue" number="1254" label="Profile Views" />
        </div>

        {/* Creator Credentials Section */}
        <h2 className="text-2xl font-semibold mb-4">Creator Credentials</h2>
        <div className="grid grid-cols-3 gap-6">
          <ImageCard src="/images/copper.png" />
          <ImageCard src="/images/silver.png" />
          <ImageCard src="/images/gold.png" />
        </div>
      </div>

      {/* Right Sidebar (Fixed) */}
      <div className="w-96 p-6 border-l border-[#333333] fixed right-0 top-0 h-screen">
        <button className="px-8 py-3 font-medium rounded-full bg-[#fb9a28] text-black mb-6">Register IP</button>
        <h3 className="text-lg font-medium mb-4">Latest Album</h3>
        <TrackItem number="00" title="Random Access Memories" artist="Daft Punk" image="/images/m1.png" isPlaying />
        <TrackItem number="01" title="Glow On" artist="Turnstile" image="/images/m2.png" />
        <TrackItem number="02" title="Dopethrone" artist="Electric Wizard" image="/images/m3.png" />
        <TrackItem number="03" title="The Narcotic Story" artist="Oxbow" image="/images/m4.png" />
        <h3 className="text-lg font-medium mt-6 mb-4">Latest Singles</h3>
        <TrackItem number="00" title="Feel Good Inc." artist="Gorillaz" image="/images/m5.png" />
        <TrackItem number="01" title="Get Lucky" artist="Daft Punk" image="/images/m6.png" />
        <TrackItem number="02" title="Ace of Spades" artist="Motörhead" image="/images/m7.png" />
        <TrackItem number="03" title="My War" artist="Black Flag" image="/images/m8.png" />
      </div>
    </div>
  );
}

/* Navigation Item */
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function NavItem({ icon, label, active = false }: NavItemProps) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-md ${active ? "bg-[#1a1a1a]" : "hover:bg-[#1a1a1a]/50"}`}>
      <div className="w-5 h-5 text-[#888888]">{icon}</div>
      <span className={active ? "font-medium" : "text-[#888888]"}>{label}</span>
    </div>
  );
}

/* Statistics Card */
interface StatCardProps {
  color: string;
  number: string | number;
  label: string;
}

function StatCard({ color, number, label }: StatCardProps) {
  const bgColorClass = {
    green: "bg-green-600",
    purple: "bg-purple-600",
    blue: "bg-blue-600",
  }[color] || "bg-gray-600";

  const bgImage = {
    green: "/images/card1.png",
    purple: "/images/card2.png",
    blue: "/images/card3.png",
  }[color] || "/images/card1.png";

  return (
    <div className={`relative overflow-hidden rounded-2xl  p-8 h-36 text-center`}>
      <div 
        className="absolute inset-0 bg-cover bg-center "
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      <div className="relative z-10">
        <div className="text-4xl font-bold mb-2">{number}</div>
        <div className="text-sm">{label}</div>
      </div>
    </div>
  );
}

/* Image Card */
interface ImageCardProps {
  src: string;
}

function ImageCard({ src }: ImageCardProps) {
  return (
    <div className="w-[175px] h-[202px] rounded-lg overflow-hidden">
      <img src={src} alt="Creator" className="w-full h-full object-cover" />
    </div>
  );
}

/* Track Item */
interface TrackItemProps {
  number: string;
  title: string;
  artist: string;
  image: string;
  isPlaying?: boolean;
}

function TrackItem({ number, title, artist, image, isPlaying = false }: TrackItemProps) {
  return (
    <div className="flex items-center gap-4 mb-3">
      <div className="w-6 text-right text-sm text-[#888888]">{number}</div>
      {isPlaying ? (
        <div className="w-6 h-6 flex items-center justify-center">
          <Play className="w-4 h-4" />
        </div>
      ) : (
        <div className="w-6 h-6 flex items-center justify-center">
          <Plus className="w-4 h-4" />
        </div>
      )}
      <img src={image} alt={title} className="w-8 h-8 rounded-full object-cover" />
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-[#888888]">{artist}</div>
      </div>
    </div>
  );
}