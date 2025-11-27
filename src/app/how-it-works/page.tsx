"use client";

import HeroSection from "@/components/HeroSection";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";


const moduleImages = [
  "/images/Adults.jpg",
  "/images/children.jpg",
  "/images/children2.jpg",
  "/images/background.jpg",
];

// صور الشهادات
const testimonialImages = [
  "/images/Adults.jpg",
  "/images/children.jpg",
  "/images/children2.jpg",
];


function HowItWorksPage() {
  const { t, dir } = useLanguage();

  // جلب الـ modules من ملفات الترجمة
  const modules = t("howItWorks.learn.modules") as unknown as Array<{
    label: string;
    title: string;
  }>;

  const testimonials = t("howItWorks.testimonials.items") as unknown as Array<{
    name: string;
    age: string;
    quote: string;
    image: string;
  }>;



  return (
    <div className="min-h-screen" dir={dir}>
      {/* القسم الأول: HeroSection */}
      <HeroSection
        title={t("howItWorks.hero.title")}
        subtitle={[t("howItWorks.hero.subtitle")]}
        img={["/images/—Pngtree—therapy session for stress addictions_12550792.jpg"]}
      />

      {/* القسم الثاني: Learn Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-card rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="flex flex-col gap-8">
            {/* العنوان والوصف */}
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                {t("howItWorks.learn.title")}
              </h2>
              <p className="text-lg text-secondary leading-relaxed">
                {t("howItWorks.learn.description")}
              </p>
            </div>
            {/* البطاقات الأربع */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.isArray(modules) &&
                modules.map((module, index) => (
                  <div
                    key={index}
                    className="bg-primary rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <img
                      src={moduleImages[index]}
                      alt={module.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4 text-center">
                      <p className="text-sm text-muted mb-1">{module.label}</p>
                      <h3 className="text-lg font-semibold text-primary">
                        {module.title}
                      </h3>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* القسم الثالث: Connect with people Section */}
      <HeroSection
        title={t("howItWorks.connect.title")}
        subtitle={[
          t("howItWorks.connect.subtitle1"),
          t("howItWorks.connect.subtitle2"),
        ]}
        subtitleLayout="vertical"
        subtitleGap={8}
        img={["/images/connect.jpg"]}
      />

      {/* القسم الرابع: Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 bg-secondary">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
            {t("howItWorks.testimonials.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.isArray(testimonials) &&
            testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-lg border border-primary-content hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-16 h-16 hrink-0">
                    <Image
                      src={testimonialImages[index % testimonialImages.length]}
                      alt={testimonial.name}
                      width={65}
                      height={70}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-primary">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-muted">{testimonial.age}</p>
                  </div>
                </div>
                <p className="text-secondary leading-relaxed">
                  {(testimonial.quote)}
                </p>
              </div>
            ))}
        </div>
      </section>

      {/* القسم الخامس: Ready Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-card rounded-3xl p-8 md:p-12 lg:p-16 shadow-xl">
          <div
            className={`grid gap-8 lg:gap-12 items-center ${dir === "rtl"
              ? "lg:grid-cols-[1fr_2fr]"
              : "lg:grid-cols-[2fr_1fr]"
              }`}
          >
            {/* النص */}
            <div className={`space-y-6 ${dir === "rtl" ? "lg:order-2" : "lg:order-1"}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">
                {t("howItWorks.ready.title")}
              </h2>
              <p className="text-lg md:text-xl text-secondary leading-relaxed">
                {t("howItWorks.ready.description")}
              </p>
              <p className="text-base md:text-lg text-secondary">
                <span className="font-bold text-primary">88%</span>{" "}
                {t("howItWorks.ready.statistic").replace("of MindBoost users", "").trim()}
              </p>
              <Link
                href="/quiz"
                className="inline-block w-96 text-center bg-success text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl"
              >
                {t("howItWorks.ready.buttonText")}
              </Link>
            </div>

            {/* الصورة */}
            <div className={`${dir === "rtl" ? "lg:order-1" : "lg:order-2"}`}>
              <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/hero.jpg"
                  alt="People using MindBoost"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HowItWorksPage;