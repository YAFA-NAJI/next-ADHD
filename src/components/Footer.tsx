"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t, dir } = useLanguage();
  const currentYear = new Date().getFullYear();
  const copyrightText = t("footer.copyright").replace("{year}", currentYear.toString());

  return (
    <div className="bg-secondary border-t border-primary-content transition-colors" dir={dir}>
      <footer className="footer footer-horizontal p-10 text-primary max-w-7xl mx-auto">
        {/* Services */}
        <nav>
          <h6 className="footer-title text-primary font-bold mb-4">
            {t("footer.services")}
          </h6>
          <a href="#" className="link text-secondary hover:text-brand transition-colors">
            {t("footer.faqs")}
          </a>
          <a href="#" className="link text-secondary hover:text-brand transition-colors">
            {t("footer.accessProgram")}
          </a>
          <Link href="/login" className="link text-secondary hover:text-brand transition-colors">
            {t("footer.login")}
          </Link>
        </nav>

        {/* MindBoost */}
        <nav>
          <h6 className="footer-title text-primary font-bold mb-4">
            {t("footer.mindBoost")}
          </h6>
          <Link href="/how-it-works" className="link text-secondary hover:text-brand transition-colors">
            {t("footer.howItWorks")}
          </Link>
          <Link href="/about" className="link text-secondary hover:text-brand transition-colors">
            {t("footer.aboutUs")}
          </Link>
          <a href="#" className="link text-secondary hover:text-brand transition-colors">
            {t("footer.careers")}
          </a>
          <Link href="/clinicians" className="link text-secondary hover:text-brand transition-colors">
            {t("footer.forClinicians")}
          </Link>
          <a href="#" className="link text-secondary hover:text-brand transition-colors">
            {t("footer.forEmployers")}
          </a>
          <Link href="/blog" className="link text-secondary hover:text-brand transition-colors">
            {t("footer.adhdBlog")}
          </Link>
          <a href="#" className="link text-secondary hover:text-brand transition-colors">
            {t("footer.testimonials")}
          </a>
        </nav>

        {/* Social */}
        <nav>
          <h6 className="footer-title text-primary font-bold mb-4">
            {t("footer.social")}
          </h6>
          <Link href="#" className="link text-secondary hover:text-brand transition-colors">
            {t("footer.facebook")}
          </Link>
          <Link href="#" className="link text-secondary hover:text-brand transition-colors">
            {t("footer.twitter")}
          </Link>
          <Link href="#" className="link text-secondary hover:text-brand transition-colors">
            {t("footer.instagram")}
          </Link>
          <Link href="#" className="link text-secondary hover:text-brand transition-colors">
            {t("footer.linkedin")}
          </Link>
          <Link href="#" className="link text-secondary hover:text-brand transition-colors">
            {t("footer.tiktok")}
          </Link>
        </nav>

        {/* Contact */}
        <nav>
          <h6 className="footer-title text-primary font-bold mb-4">
            {t("footer.contact")}
          </h6>
          <a
            href="mailto:haneentech01@gmail.com"
            className="link text-secondary hover:text-brand transition-colors"
          >
            haneentech01@gmail.com
          </a>
          <a href="#" className="link text-secondary hover:text-brand transition-colors">
            {t("footer.address")}
          </a>
        </nav>
      </footer>

      <footer className="border-t border-primary-content px-4 md:px-10 pb-8">
        <div className="mt-10 flex flex-col items-center justify-center text-center space-y-2 max-w-7xl mx-auto">
          <ul className={`flex gap-3 flex-wrap justify-center ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
            <li>
              <Link href="#" className="link text-secondary hover:text-brand transition-colors">
                {t("footer.privacyPolicy")}
              </Link>
            </li>
            <li>
              <Link href="#" className="link text-secondary hover:text-brand transition-colors">
                {t("footer.termsAndConditions")}
              </Link>
            </li>
            <li>
              <Link href="#" className="link text-secondary hover:text-brand transition-colors">
                {t("footer.postingPolicy")}
              </Link>
            </li>
          </ul>

          <p className="text-muted text-sm">
            {copyrightText}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;