"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function PasswordRecoveryPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/new-password", // رابط إعادة التعيين بعد الضغط
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password recovery email sent! Check your inbox.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background dark:bg-background-dark">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-md w-full max-w-md flex flex-col"
      >
        <h1 className="text-2xl font-bold mb-4 text-primary dark:text-primary-dark">
          Password Recovery
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 mb-4 border border-text-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />

        <button
          type="submit"
          className="bg-primary text-white p-3 rounded-lg font-semibold hover:bg-primary-dark transition"
        >
          Send Recovery Email
        </button>

        {message && <p className="mt-4 text-green-600">{message}</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </form>
    </div>
  );
}
