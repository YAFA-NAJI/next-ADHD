"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    setLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="btn btn-ghost btn-sm md:btn-md gap-2 text-primary hover:bg-secondary transition-colors"
      aria-label={`Switch to ${language === "en" ? "Arabic" : "English"}`}
    >
      <span className="text-lg font-semibold">
        {language === "en" ? "عربي" : "EN"}
      </span>
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
          strokeWidth={2}
          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
        />
      </svg>
    </button>
  );
};

export default LanguageToggle;