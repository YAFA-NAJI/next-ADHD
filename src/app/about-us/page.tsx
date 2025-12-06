"use client";

import HeroSection from '@/components/HeroSection';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import React from 'react';

const AboutUsPage = () => {
  const { t, dir } = useLanguage();

  return (
    <div>
      {/* Our Story Section */}
      <section dir={dir}>
        <HeroSection
          title={t('aboutUs.ourStory.title')}
          subtitle={[
            t("aboutUs.ourStory.description1"),
            t("aboutUs.ourStory.description2")
          ]}
          img={["/images/Two_professional_Muslim_women.jpg"]}
        />
      </section>

      {/* Our Mission Section */}
      <section dir={dir}>
        <HeroSection
          title={t('aboutUs.ourMission.title')}
          subtitle={[
            t("aboutUs.ourMission.description1Before") + " " + t("aboutUs.ourMission.middle") + " " + t("aboutUs.ourMission.description1After"),
            t("aboutUs.ourMission.description2")
          ]}
          img={["/images/Two_professional_Muslim_women.jpg"]}
        />
      </section>
    </div>
  );
};

export default AboutUsPage;
