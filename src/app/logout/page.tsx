"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // إزالة أي توكن موجود في التخزين المحلي
    localStorage.removeItem("token");
    // إعادة التوجيه إلى صفحة الدخول أو الرئيسية
    router.push("/login"); 
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg font-semibold">Logging out...</p>
    </div>
  );
}
