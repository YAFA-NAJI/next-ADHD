"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CountUp from 'react-countup';
import {
  Brain, Users, Sparkles, TestTube2, BookOpen, Mic, MessageSquareQuote, HeartHandshake
} from 'lucide-react';
import About from '../components/About'; // قسم About

// بطاقة للمقالات أو البودكاست
const ContentCard = ({ type, title, author, href, icon }: { type: string, title: string, author: string, href: string, icon: React.ReactNode }) => (
  <Link href={href} className="block bg-linear-to-tr from-indigo-50 to-white dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
    <div className="flex items-center gap-4 mb-3">
      <div className="bg-secondary/10 dark:bg-secondary-dark/20 p-2 rounded-full">
        {icon}
      </div>
      <span className="text-sm font-semibold text-secondary dark:text-secondary-dark uppercase">{type}</span>
    </div>
    <h3 className="text-lg font-bold text-text dark:text-text-dark mb-2">{title}</h3>
    <p className="text-sm text-text-secondary dark:text-text-secondary-dark">By {author}</p>
  </Link>
);

// بطاقة شهادات المستخدم
const TestimonialCard = ({ text, name, role, imgSrc }: { text: string, name: string, role: string, imgSrc: string }) => (
  <div className="bg-surface dark:bg-surface-dark p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300">
    <Image
      src={imgSrc}
      alt={name}
      width={80}
      height={80}
      className="rounded-full mx-auto mb-4 border-4 border-primary dark:border-primary-dark"
    />
    <p className="text-text-secondary dark:text-text-secondary-dark italic mb-4">{text}</p>
    <h4 className="font-bold text-text dark:text-text-dark">{name}</h4>
    <p className="text-sm text-primary dark:text-primary-dark">{role}</p>
  </div>
);

export default function Home() {
  const dailyPositiveMessage = "Your unique mind is your greatest asset. Embrace the journey, one step at a time.";

  return (
    <div className="bg-background dark:bg-background-dark scroll-smooth">

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center px-8 md:px-16 overflow-hidden"
        style={{
          backgroundImage: 'url("/images/background.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay  */}
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50"></div>

        {/* Text Left */}
        <div className="relative z-10 max-w-3xl text-left flex-1">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white dark:text-indigo-400 mb-4 leading-tight drop-shadow-lg">
            Unlock Your Potential with ADHD
          </h1>
          <p className="text-lg md:text-xl text-white/90 dark:text-indigo-100 mb-8 drop-shadow-md">
            MindBoost is your supportive space to understand your brain, embrace your uniqueness, and thrive in daily life.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link href="/adhd-test" className="flex items-center gap-2 px-8 py-3 font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-full shadow-lg transition-all duration-300">
              <TestTube2 size={20} /> Start the Test
            </Link>
            <Link href="/community" className="flex items-center gap-2 px-8 py-3 font-semibold text-indigo-700 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300">
              <Users size={20} /> Join Community
            </Link>
            <Link href="/success-stories" className="flex items-center gap-2 px-8 py-3 font-semibold text-white bg-amber-500 hover:bg-amber-400 rounded-full shadow-lg transition-all duration-300">
              <Sparkles size={20} /> Success Stories
            </Link>
          </div>
        </div>

        {/* الصورة على الجانب الأيمن للشاشات الكبيرة */}
        <div className="hidden md:block flex-1 relative">
          <Image
            src="/images/hero-adhd.jpg"
            alt="ADHD Hero"
            fill
            className="object-cover rounded-xl shadow-xl"
          />
        </div>
      </section>


      {/* Inspiring Stats */}
      <section className="py-20 bg-surface dark:bg-surface-dark">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <Brain className="w-12 h-12 text-secondary dark:text-secondary-dark mb-3" />
            <p className="text-4xl font-bold text-text dark:text-text-dark">
              <CountUp end={40} duration={3} />%
            </p>
            <p className="text-text-secondary dark:text-text-secondary-dark">More likely to be entrepreneurs.</p>
          </div>
          <div className="flex flex-col items-center">
            <Sparkles className="w-12 h-12 text-secondary dark:text-secondary-dark mb-3" />
            <p className="text-4xl font-bold text-text dark:text-text-dark">
              <CountUp end={75} duration={3} />%
            </p>
            <p className="text-text-secondary dark:text-text-secondary-dark">Report high levels of creativity.</p>
          </div>
          <div className="flex flex-col items-center">
            <HeartHandshake className="w-12 h-12 text-secondary dark:text-secondary-dark mb-3" />
            <p className="text-4xl font-bold text-text dark:text-text-dark">
              <CountUp end={80} duration={3} />%
            </p>
            <p className="text-text-secondary dark:text-text-secondary-dark">Excel in crisis situations.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <About />
      </section>

      {/* Latest Content Section */}
      <section className="py-20 bg-background dark:bg-background-dark">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary dark:text-primary-dark mb-10">Latest Articles & Podcasts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ContentCard type="Article" title="5 Time Management Hacks for the ADHD Brain" author="Dr. Jane Doe" href="/articles/time-management" icon={<BookOpen className="w-6 h-6 text-secondary dark:text-secondary-dark" />} />
            <ContentCard type="Podcast" title="Hyperfocus: Your Secret Superpower" author="Mike Smith" href="/podcasts/hyperfocus" icon={<Mic className="w-6 h-6 text-secondary dark:text-secondary-dark" />} />
            <ContentCard type="Article" title="Navigating Relationships with ADHD" author="Emily Carter" href="/articles/relationships" icon={<BookOpen className="w-6 h-6 text-secondary dark:text-secondary-dark" />} />
          </div>
        </div>
      </section>

      {/* Daily Positive Message */}
      <section className="py-16 bg-linear-to-r from-indigo-600 to-amber-500 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center rounded-xl shadow-xl p-8">
          <MessageSquareQuote className="w-10 h-10 mx-auto mb-4" />
          <p className="text-2xl md:text-3xl font-semibold italic drop-shadow-lg">{dailyPositiveMessage}</p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-surface dark:bg-surface-dark">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary dark:text-primary-dark mb-12">What Our Community Says</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            <TestimonialCard
              name="Alex Johnson"
              role="Developer"
              text="This site made me feel understood for the first time. The tools are practical and have genuinely helped my daily workflow."
              imgSrc="/images/testimonial1.jpg"
            />
            <TestimonialCard
              name="Sarah Lee"
              role="Student"
              text="Finding the community forum was a game-changer. I've connected with so many people who share my experiences."
              imgSrc="/images/testimonial2.jpg"
            />
            <TestimonialCard
              name="Mark Chen"
              role="Entrepreneur"
              text="The success stories inspired me to launch my own business. MindBoost helped me see my ADHD as a strength, not a weakness."
              imgSrc="/images/testimonial3.jpg"
            />
          </div>
        </div>
      </section>

    </div>
  );
}


