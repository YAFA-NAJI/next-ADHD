"use client";

import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </LanguageProvider>
  );
}