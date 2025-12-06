"use client";

import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { usePathname } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideLayout = ["/login", "/signup"];
  const shouldHideLayout = hideLayout.includes(pathname);

  return (
    <LanguageProvider>
      {!shouldHideLayout && <Navbar />}
      <main>{children}</main>
      {!shouldHideLayout && <Footer />}
    </LanguageProvider>
  );
}
