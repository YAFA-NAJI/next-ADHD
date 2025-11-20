"use client";

import React from 'react';
import { 
    BrainCircuit, 
    ClipboardList, 
    Users, 
    HeartPulse, 
    Lightbulb, 
    Sparkles, 
    BarChart3, 
    CheckCircle, 
    XCircle,
    Youtube
} from 'lucide-react';
import Image from 'next/image';

// بطاقة معلومات عامة
const InfoCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
        <div className="bg-gradient-to-tr from-indigo-400 to-emerald-400 p-4 rounded-full mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-300 mb-2">{title}</h3>
        <p className="text-gray-700 dark:text-gray-200">{children}</p>
    </div>
);

// بطاقة الأعراض
const SymptomCard = ({ title, items, imageSrc }: { title: string, items: string[], imageSrc: string }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
        <div className="relative h-56 w-full">
            <Image src={imageSrc} alt={title} fill style={{ objectFit: 'cover' }} className="hover:scale-110 transition-transform duration-500"/>
        </div>
        <div className="p-6">
            <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-300 mb-4">{title}</h3>
            <ul className="space-y-3">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start">
                        <ClipboardList className="w-5 h-5 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-200">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const About = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-20">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <header className="text-center mb-16 relative">
          <div className="mx-auto w-32 h-32 rounded-full bg-gradient-to-tr from-indigo-400 to-emerald-400 flex items-center justify-center shadow-xl mb-6 animate-bounce">
            <BrainCircuit className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-600 dark:text-indigo-300 mb-4 drop-shadow-lg">
            Understanding ADHD
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-2xl mx-auto leading-relaxed">
            A clear and supportive guide to Attention-Deficit/Hyperactivity Disorder, helping you understand the brain and thrive every day.
          </p>
        </header>

        {/* What is ADHD */}
        <section id="what-is-adhd" className="mb-20 p-8 rounded-2xl shadow-lg bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 transition-colors">
          <h2 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-300 mb-6 flex items-center gap-3">
            <Lightbulb className="w-8 h-8 text-yellow-400 animate-pulse" /> What is ADHD?
          </h2>
          <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
            Attention-Deficit/Hyperactivity Disorder (ADHD) is a <strong className="text-indigo-500">neurodevelopmental condition</strong> affecting millions worldwide. 
            It's <span className="text-amber-500 font-semibold">not a flaw or laziness</span>, but a real condition characterized by persistent patterns of 
            <strong className="text-green-500"> inattention, hyperactivity</strong>, and <strong className="text-red-400">impulsivity</strong> that can impact daily life. Understanding it is the first step toward thriving!
          </p>
        </section>

        {/* Symptoms */}
        <section id="symptoms" className="mb-20">
          <h2 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-300 mb-8 text-center">Symptoms Across the Lifespan</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            <SymptomCard 
              title="In Children"
              imageSrc="/images/children2.jpg"
              items={[
                "Makes careless mistakes",
                "Trouble staying focused during play",
                "Fidgets and squirms frequently",
                "Talks excessively and interrupts",
              ]}
            />
            <SymptomCard 
              title="In Adolescents"
              imageSrc="/images/Adolescents.jpg"
              items={[
                "Poor time management skills",
                "Difficulty prioritizing tasks",
                "Experiences intense frustration",
                "Engages in risky behaviors",
              ]}
            />
            <SymptomCard 
              title="In Adults"
              imageSrc="/images/Adults.jpg"
              items={[
                "Chronic disorganization",
                "Struggles with procrastination",
                "Frequent mood swings",
                "Impulsive decision-making",
              ]}
            />
          </div>
        </section>

        {/* Causes & Types */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <section id="causes">
            <h2 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-300 mb-6 flex items-center gap-3">
              <HeartPulse className="w-8 h-8 text-red-400" /> Causes and Risk Factors
            </h2>
            <div className="space-y-4">
              <p className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-gray-700 dark:text-gray-200"><strong>Genetics:</strong> ADHD often runs in families, showing a strong genetic link.</p>
              <p className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-gray-700 dark:text-gray-200"><strong>Brain Differences:</strong> Variations in brain structure, function, and chemistry are key factors.</p>
              <p className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-gray-700 dark:text-gray-200"><strong>Environmental Factors:</strong> Prenatal exposure to substances and premature birth can increase risk.</p>
            </div>
          </section>
          <section id="types">
            <h2 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-300 mb-6 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-yellow-400" /> The Three Presentations
            </h2>
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-indigo-500">1. Predominantly Inattentive</h3>
                <p className="text-gray-700 dark:text-gray-200">Difficulty with focus, organization, and details.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-green-500">2. Predominantly Hyperactive-Impulsive</h3>
                <p className="text-gray-700 dark:text-gray-200">Restlessness, impulsivity, and excessive talking.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-red-400">3. Combined Presentation</h3>
                <p className="text-gray-700 dark:text-gray-200">A mix of both inattentive and hyperactive symptoms.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Statistics */}
        <section id="statistics" className="mb-20 text-center">
          <h2 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-300 mb-6 flex items-center justify-center gap-3">
            <BarChart3 className="w-8 h-8 text-indigo-500" /> Global Statistics
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex-1">
              <p className="text-4xl font-bold text-indigo-500">~5-10%</p>
              <p className="text-gray-700 dark:text-gray-200">of children worldwide are estimated to have ADHD.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex-1">
              <p className="text-4xl font-bold text-indigo-500">~3.1%</p>
              <p className="text-gray-700 dark:text-gray-200">of adults worldwide live with the condition.</p>
            </div>
          </div>
        </section>

        {/* Myths vs Facts */}
        <section id="myths-facts" className="mb-20">
          <h2 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-300 mb-8 text-center">Myths vs. Facts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-100/50 dark:bg-red-900/20 p-4 rounded-lg flex items-start gap-4">
              <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              <p className="font-bold">Myth: ADHD is just an excuse for laziness.</p>
            </div>
            <div className="bg-green-100/50 dark:bg-green-900/20 p-4 rounded-lg flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <p className="font-bold">Fact: It's a real neurobiological condition affecting executive functions.</p>
            </div>
            <div className="bg-red-100/50 dark:bg-red-900/20 p-4 rounded-lg flex items-start gap-4">
              <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              <p className="font-bold">Myth: Only boys have ADHD.</p>
            </div>
            <div className="bg-green-100/50 dark:bg-green-900/20 p-4 rounded-lg flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <p className="font-bold">Fact: It affects all genders, but symptoms can present differently.</p>
            </div>
          </div>
        </section>

        {/* Video */}
        <section id="video">
          <h2 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-300 mb-6 flex items-center gap-3">
            <Youtube className="w-8 h-8 text-red-500" /> Watch and Learn
          </h2>
          <div className="aspect-w-16 aspect-h-9 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-300 dark:border-gray-700">
            <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/vQRh_VMA7Vc" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen>
                </iframe>
            </div>
        </section>

      </div>
    </div>
  );
};

export default About;
