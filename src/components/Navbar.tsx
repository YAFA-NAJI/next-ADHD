"use client";
<<<<<<< HEAD

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, LogIn, LogOut, UserCircle, Home, BookOpen, Users, Info } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

function Navbar() {
  const { t, dir } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    const handleResize = () => setIsMenuOpen(false);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navLinks = [
    { href: "/", label: t("common.getStarted") || "الرئيسية", icon: <Home size={20} /> },
    { href: "/how-it-works", label: t("nav.howItWorks"), icon: <Info size={20} /> },
    { href: "/about-us", label: t("nav.aboutUs"), icon: <Users size={20} /> },
    { href: "/blog", label: t("nav.adhdBlog"), icon: <BookOpen size={20} /> },
    { href: "/clinicians", label: t("nav.forClinicians"), icon: <UserCircle size={20} /> },
  ];

  return (
    <header
      dir={dir}
      className={`sticky top-0 z-50 w-full transition-shadow duration-300 backdrop-blur-sm ${
        hasScrolled ? "shadow-lg bg-white/95 dark:bg-gray-900/95" : "bg-white/90 dark:bg-gray-900/90"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/10371/10371907.png"
            alt="MindBoost Logo"
            width={40} // Reduced size
            height={40} // Reduced size
            className="transform transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500 transition-colors">
            {t("footer.mindBoost") || "MindBoost"}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-1"> {/* Reduced gap */}
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
              >
                {/* Removed icon from desktop view for cleaner look */}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Auth & Toggles */}
        <div className="hidden lg:flex items-center gap-3"> {/* Reduced gap */}
          <LanguageToggle />
          <ThemeToggle />
          {user ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
              >
                <UserCircle size={18} /> {t("nav.profile") || "الملف الشخصي"}
              </Link>
              <button
                onClick={signOut}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors duration-200 shadow-md"
              >
                <LogOut size={18} /> {t("nav.logOut") || "تسجيل الخروج"}
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-md"
            >
              <LogIn size={18} /> {t("nav.logIn")}
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
          <ul className="px-4 pt-2 pb-4 flex flex-col gap-1"> {/* Reduced gap */}
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  {link.icon} {link.label}
                </Link>
              </li>
            ))}
            <div className="my-2 border-t border-gray-300 dark:border-gray-700"></div>
            {user ? (
              <>
                <li>
                  <Link
                    href="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                  >
                    <UserCircle size={20} /> {t("nav.profile") || "الملف الشخصي"}
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => { signOut(); setIsMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-red-500 text-white rounded-lg text-base font-medium hover:bg-red-600 transition-colors duration-200 shadow-md justify-start"
                  >
                    <LogOut size={20} /> {t("nav.logOut") || "تسجيل الخروج"}
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 bg-indigo-600 text-white rounded-lg text-base font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-md"
                >
                  <LogIn size={20} /> {t("nav.logIn")}
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Navbar;
=======
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
>>>>>>> 48f0b8939c07e93bfbbfa9709e465889d951542d
