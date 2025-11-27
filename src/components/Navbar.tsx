"use client";

import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

function Navbar() {
  const { t, dir } = useLanguage();

  return (
    <div 
      className="navbar bg-primary shadow-sm transition-colors duration-300 sticky top-0 z-50"
      dir={dir}
    >
      <div className="navbar-start">
        {/* Navbar Dropdown Menu on sm-lg  */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden text-primary hover:bg-secondary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-card rounded-box z-[1] mt-3 w-52 p-2 shadow-lg border border-secondary"
          >
            <li>
              <Link
                href="/how-it-works"
                className="text-primary hover:bg-secondary hover:text-brand transition-colors"
              >
                {t("nav.howItWorks")}
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-primary hover:bg-secondary hover:text-brand transition-colors"
              >
                {t("nav.aboutUs")}
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-primary hover:bg-secondary hover:text-brand transition-colors"
              >
                {t("nav.adhdBlog")}
              </Link>
            </li>
            <li>
              <Link
                href="/clinicians"
                className="text-primary hover:bg-secondary hover:text-brand transition-colors"
              >
                {t("nav.forClinicians")}
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="text-primary hover:bg-secondary hover:text-brand transition-colors"
              >
                {t("nav.logIn")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Navbar Logo */}
        <Link href="/" className="flex items-center gap-2 lg:gap-4 hover:opacity-80 transition-opacity">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/10371/10371907.png"
            alt="MindBoost Logo"
            width={55}
            height={55}
            className="dark:brightness-110"
          />
          <span className="text-2xl md:text-4xl font-bold text-brand transition-colors">
            MindBoost
          </span>
        </Link>
      </div>

      {/*Navbar Center Links on lg  */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          <li>
            <Link
              href="/how-it-works"
              className="text-primary hover:bg-secondary hover:text-brand transition-colors rounded-lg"
            >
              {t("nav.howItWorks")}
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-primary hover:bg-secondary hover:text-brand transition-colors rounded-lg"
            >
              {t("nav.aboutUs")}
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="text-primary hover:bg-secondary hover:text-brand transition-colors rounded-lg"
            >
              {t("nav.adhdBlog")}
            </Link>
          </li>
          <li>
            <Link
              href="/clinicians"
              className="text-primary hover:bg-secondary hover:text-brand transition-colors rounded-lg"
            >
              {t("nav.forClinicians")}
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              className="text-primary hover:bg-secondary hover:text-brand transition-colors rounded-lg"
            >
              {t("nav.logIn")}
            </Link>
          </li>
        </ul>
      </div>

      {/* Take The Quiz Button */}
      <div className="navbar-end gap-2 lg:gap-5">
        <LanguageToggle />
        <ThemeToggle />
        <a
          className="btn bg-brand text-white hover:opacity-90 transition-opacity border-0 shadow-md hover:shadow-lg"
        >
          {t("nav.takeTheQuiz")}
        </a>
      </div>
    </div>
  );
}

export default Navbar;