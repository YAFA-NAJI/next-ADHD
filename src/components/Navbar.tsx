"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [exploreDropdown, setExploreDropdown] = useState(false);

  const exploreItems = [
    { label: "What is ADHD", href: "#what-is-adhd" },
    { label: "Symptoms", href: "#symptoms" },
    { label: "Causes", href: "#causes" },
    { label: "The Three Types of ADHD", href: "#types" },
    { label: "Global Statistics", href: "#statistics" },
    { label: "Myths vs Facts", href: "#myths-facts" },
    { label: "Explanatory Video", href: "#video" },
    "ADHD Test",
    "Daily Tools (Timers, Checklists, Planner, Focus Mode)",
    "Tips for Parents",
    "Tips for Students",
    "Tips for Teachers",
    "Success Stories",
    "Articles / Blog",
    "Community",
    "Consult a Specialist",
    "User Dashboard",
  ];

  return (
    <nav className="w-full bg-white dark:bg-[#1E1E1E] shadow-md fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand + Logo */}
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/10371/10371907.png"
            alt="MindBoost Logo"
            width={55}
            height={55}
          />
          <span className="text-3xl md:text-4xl font-bold text-[#4A90E2] dark:text-white">
            MindBoost
          </span>
        </Link>

        {/* Center Menu */}
        <div className="hidden md:flex items-center space-x-8 mx-auto">
          <Link href="/" className="text-gray-700 dark:text-gray-200 font-medium hover:text-[#4A90E2] transition">
            Home
          </Link>
          <Link href="#about" className="text-gray-700 dark:text-gray-200 font-medium hover:text-[#4A90E2] transition">
            About
          </Link>

          {/* Explore Dropdown */}
          <div className="relative">
            <button
              onClick={() => setExploreDropdown(!exploreDropdown)}
              className="text-gray-700 dark:text-gray-200 font-medium flex items-center hover:text-[#4A90E2] transition"
            >
              Explore <ChevronDown size={18} className="ml-1"/>
            </button>
            {exploreDropdown && (
              <div className="absolute right-0 mt-2 w-64 max-h-[400px] overflow-auto bg-white dark:bg-[#2C2C2C] shadow-lg rounded-lg py-2 border border-[#F7F9FC] dark:border-[#3A3A3A] z-50">
                {exploreItems.map((item, index) => {
                  const href = typeof item === "string" ? `/${item.toLowerCase().replace(/\s+/g, "-")}` : item.href;
                  const label = typeof item === "string" ? item : item.label;
                  return (
                    <Link
                      key={index}
                      href={href}
                      className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-[#F7F9FC] dark:hover:bg-[#3A3A3A] hover:text-[#4A90E2] transition"
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login" className="px-4 py-2 border rounded-lg text-[#4A90E2] border-[#4A90E2] dark:text-white dark:border-white">Login</Link>
          <Link href="/signup" className="px-4 py-2 rounded-lg text-white bg-[#7B61FF]">Signup</Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} className="text-gray-700 dark:text-white"/> : <Menu size={28} className="text-gray-700 dark:text-white"/>}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-[#1E1E1E] shadow-md px-6 py-4 space-y-4">
          <Link href="/" onClick={() => setOpen(false)} className="block text-gray-700 dark:text-gray-200 hover:text-[#4A90E2]">
            Home
          </Link>
          <Link href="#about" onClick={() => setOpen(false)} className="block text-gray-700 dark:text-gray-200 hover:text-[#4A90E2]">
            About
          </Link>

          {/* Explore collapsed list */}
          <div className="border-t pt-3 border-[#F7F9FC] dark:border-[#3A3A3A]">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Explore</p>
            {exploreItems.map((item, index) => {
              const href = typeof item === "string" ? `/${item.toLowerCase().replace(/\s+/g, "-")}` : item.href;
              const label = typeof item === "string" ? item : item.label;
              return (
                <Link
                  key={index}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block text-gray-700 dark:text-gray-200 py-1 hover:text-[#4A90E2]"
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons */}
          <div className="pt-4 space-y-3">
            <Link
              href="/login"
              className="block px-4 py-2 border rounded-lg text-center text-[#4A90E2] border-[#4A90E2] dark:text-white dark:border-white"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="block px-4 py-2 rounded-lg text-center text-white bg-[#7B61FF]"
              onClick={() => setOpen(false)}
            >
              Signup
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
