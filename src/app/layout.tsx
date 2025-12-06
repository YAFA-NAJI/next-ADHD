<<<<<<< HEAD
//Layout.tsx
import { Geist, Geist_Mono, Open_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext"; 
import { Providers } from "@/components/Providers";
=======
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar"; // <-- استيراد Navbar فقط
>>>>>>> 48f0b8939c07e93bfbbfa9709e465889d951542d

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

<<<<<<< HEAD
const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${openSans.variable} antialiased bg-primary text-primary`}
      >
        <AuthProvider>
          <Providers>
            {children}
          </Providers>
        </AuthProvider>
=======
export const metadata: Metadata = {
  title: "MindBoost - Understand ADHD", // <-- يمكنك تحديث العنوان
  description: "A platform to learn about and manage ADHD.", // <-- يمكنك تحديث الوصف
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className="pt-20">{children}</main>
>>>>>>> 48f0b8939c07e93bfbbfa9709e465889d951542d
      </body>
    </html>
  );
}
