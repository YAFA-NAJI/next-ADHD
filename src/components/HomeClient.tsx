"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Brain,
  Users,
  Sparkles,
  TestTube2,
  MessageSquareQuote,
  HeartHandshake,
  ArrowRight
} from "lucide-react";

// --- استخدم LanguageContext ---
import { useLanguage } from "../contexts/LanguageContext";

// --- Sub Components ---

const FeatureHighlight = ({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="flex gap-4 p-5 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-indigo-500">
    <div className="flex-shrink-0">
      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
        {icon}
      </div>
    </div>
    <div>
      <h3 className="font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  </div>
);

const StatCard = ({
  icon,
  value,
  desc
}: {
  icon: React.ReactNode;
  value: string;
  desc: string;
}) => (
  <div className="group relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-indigo-500 overflow-hidden">
    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <p className="text-4xl md:text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">{value}</p>
      <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

// --- Main Component ---
export default function HomeClient() {
  const { t, dir } = useLanguage();

  return (
    <div className="bg-white dark:bg-gray-900 scroll-smooth" dir={dir}>

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center px-6 md:px-12 overflow-hidden"
        style={{
          backgroundImage: 'url("/images/heroo.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>

        <div className="relative z-10 max-w-2xl">
          <div className="mb-8">
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold 
                text-white leading-tight drop-shadow-lg tracking-tight"
            >
              {t("hero.title")}
            </h1>

            <div className="w-16 h-1 bg-gradient-to-r from-indigo-400 to-amber-400 rounded-full"></div>
          </div>

          <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed max-w-xl">
            {t("hero.description")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-row items-center gap-3 flex-nowrap">
            <Link
              href="/adhd-test"
              className="inline-flex items-center gap-2 px-6 py-4 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-sm"
            >
              <TestTube2 size={25} /> {t("hero.takeTest")}
            </Link>

            <Link
              href="/community"
              className="inline-flex items-center gap-2 px-6 py-4 font-bold text-indigo-700 bg-white hover:bg-gray-100 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-sm"
            >
              <Users size={25} /> {t("hero.joinCommunity")}
            </Link>

            <Link
              href="/success-stories"
              className="inline-flex items-center gap-2 px-6 py-4 font-bold text-white bg-amber-500 hover:bg-amber-400 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-sm"
            >
              <Sparkles size={25} /> {t("hero.successStories")}
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t("whyChoose.title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              {t("whyChoose.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <FeatureHighlight
              icon={<Brain className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
              title={t("whyChoose.understandBrain")}
              description={t("whyChoose.understandBrainDesc")}
            />

            <FeatureHighlight
              icon={<Sparkles className="w-6 h-6 text-amber-500 dark:text-amber-400" />}
              title={t("whyChoose.unlockCreativity")}
              description={t("whyChoose.unlockCreativityDesc")}
            />

            <FeatureHighlight
              icon={<Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
              title={t("whyChoose.joinCommunity")}
              description={t("whyChoose.joinCommunityDesc")}
            />

            <FeatureHighlight
              icon={<HeartHandshake className="w-6 h-6 text-rose-600 dark:text-rose-400" />}
              title={t("whyChoose.getSupport")}
              description={t("whyChoose.getSupportDesc")}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t("stats.title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t("stats.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard
              icon={<Brain className="w-14 h-14 text-indigo-600 dark:text-indigo-400 mb-4" />}
              value="40%"
              desc={t("stats.stat1")}
            />

            <StatCard
              icon={<Sparkles className="w-14 h-14 text-amber-500 dark:text-amber-400 mb-4" />}
              value="75%"
              desc={t("stats.stat2")}
            />

            <StatCard
              icon={<HeartHandshake className="w-14 h-14 text-emerald-600 dark:text-emerald-400 mb-4" />}
              value="80%"
              desc={t("stats.stat3")}
            />
          </div>
        </div>
      </section>

    </div>
  );
}
