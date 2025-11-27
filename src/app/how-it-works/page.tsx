"use client";

import HeroSection from "@/components/HeroSection";
import { useLanguage } from "@/contexts/LanguageContext";

const modulesData = {
  en: [
    { label: "Module 1", title: "Anxiety" },
    { label: "Module 2", title: "Procrastination" },
    { label: "Module 3", title: "Impulsivity" },
    { label: "Module 4", title: "Avoidance" },
  ],
  ar: [
    { label: "الوحدة 1", title: "القلق" },
    { label: "الوحدة 2", title: "المماطلة" },
    { label: "الوحدة 3", title: "الاندفاعية" },
    { label: "الوحدة 4", title: "التجنب" },
  ],
};

const moduleImages = [
  "/images/Adults.jpg",
  "/images/children.jpg",
  "/images/children2.jpg",
  "/images/background.jpg",
];

function HowItWorksPage() {
  const { t, dir, language } = useLanguage();
  const modules = modulesData[language];

  return (
    <div className="min-h-screen" dir={dir}>
      {/* القسم الأول: HeroSection */}
      <HeroSection
        title={t("howItWorks.hero.defaultTitle")}
        subtitle={[t("howItWorks.hero.defaultSubtitle")]}
        img={["/images/—Pngtree—therapy session for stress addictions_12550792.jpg"]}
      />

      {/* القسم الثاني: Learn Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-card rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="flex flex-col gap-8">
            {/* العنوان والوصف */}
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                {t("howItWorks.learn.learnTitle")}
              </h2>
              <p className="text-lg text-secondary leading-relaxed">
                {t("howItWorks.learn.learnDescription")}
              </p>
            </div>
            {/* البطاقات الأربع */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.isArray(modules) && modules.map((module, index) => (
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
        title={t("howItWorks.connect.defaultTitle")}
        subtitle={[t("howItWorks.connect.defaultSubtitle"), t("howItWorks.connect.anotherSubtitle")]}
        subtitleLayout="vertical"
        subtitleGap={8}
        img={["/images/connect.jpg"]}
      />
    </div>
  );
}

export default HowItWorksPage;