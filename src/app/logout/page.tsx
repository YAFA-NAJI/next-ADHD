"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("token");
    router.push("/"); 
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg font-semibold">Logging out...</p>
    </div>
  );
}
