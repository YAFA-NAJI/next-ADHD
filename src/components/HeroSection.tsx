"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeroSectionProps {
  title: string;
  subtitle?: string | string[];
  ctaText?: string;
  ctaLink?: string;
  img?: string[];
  subtitleLayout?: "vertical" | "horizontal"; // عمودي أو أفقي
  subtitleGap?: number; // gap بالبكسل (افتراضي: 6)
}

function HeroSection({
  title,
  subtitle,
  ctaLink,
  ctaText,
  img = [],
  subtitleLayout = "vertical", // افتراضي عمودي
  subtitleGap = 6, // افتراضي gap-6
}: HeroSectionProps) {
  const { dir } = useLanguage();
  const validImages = img.filter(
    (src) => typeof src === "string" && src.trim().length > 0
  );
  const hasImages = validImages.length > 0;
  const gridCols =
    validImages.length === 1
      ? "grid-cols-1 max-w-xl"
      : validImages.length === 2
        ? "grid-cols-1 sm:grid-cols-2 max-w-2xl"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-3xl";

  // تحويل subtitle إلى مصفوفة إذا كان string
  const subtitleArray = Array.isArray(subtitle) ? subtitle : subtitle ? [subtitle] : [];

  return (
    <section
      className="hero bg-secondary min-h-screen transition-colors duration-300 font-open-sans"
      dir={dir}
    >
      <div
        className={`hero-content flex-col gap-8 lg:gap-12 
          ${dir === "rtl" ? "lg:flex-row-reverse" : "lg:flex-row"}
        `}
      >
        {hasImages && (
          <div className={`grid gap-6 mx-auto ${gridCols}`}>
            {validImages.map((src, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg shadow-2xl bg-card p-2 transition-transform hover:scale-105 duration-300"
              >
                <Image
                  src={src}
                  alt={`section-image-${index}`}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover rounded-lg"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        )}
        <div className={`flex-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 transition-colors leading-tight">
            {title}
          </h1>
          {subtitleArray.length > 0 && (
            <div
              className={`py-6 text-lg md:text-xl text-secondary leading-relaxed max-w-2xl transition-colors ${
                subtitleLayout === "horizontal" ? "flex flex-wrap" : "flex flex-col"
              }`}
              style={{ gap: `${subtitleGap * 0.25}rem` }}
            >
              {subtitleArray.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>
          )}
          {ctaText && ctaLink && (
            <a
              href={ctaLink}
              className="btn bg-brand text-white hover:opacity-90 transition-all duration-300 border-0 shadow-lg hover:shadow-xl text-lg px-8 py-3 mt-4"
            >
              {ctaText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;