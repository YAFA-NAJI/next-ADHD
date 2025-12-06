"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
<<<<<<< HEAD
import { supabase } from "@/utils/supabaseClient"; // تأكد أن المسار صحيح
=======
>>>>>>> 48f0b8939c07e93bfbbfa9709e465889d951542d

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
<<<<<<< HEAD
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      // نجاح تسجيل الدخول
      router.push("/"); // أو أي صفحة تريد إعادة التوجيه إليها بعد تسجيل الدخول
=======

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // مثال مؤقت لتسجيل الدخول
    if (email === "user@example.com" && password === "123456") {
      alert("Login successful!");
      router.push("/");
    } else {
      alert("Invalid credentials");
>>>>>>> 48f0b8939c07e93bfbbfa9709e465889d951542d
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/images/login-bg.jpg')",
      }}
    >
<<<<<<< HEAD
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Form */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 bg-white bg-opacity-90 p-10 rounded-2xl shadow-lg w-full max-w-md flex flex-col items-center"
      >
=======
      {/* Overlay لتسهيل قراءة النصوص */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Form */}
      <form className="relative z-10 bg-white bg-opacity-90 p-10 rounded-2xl shadow-lg w-full max-w-md flex flex-col items-center">
>>>>>>> 48f0b8939c07e93bfbbfa9709e465889d951542d
        <h1 className="text-3xl font-bold mb-6 text-primary text-center">
          Welcome Back
        </h1>

<<<<<<< HEAD
        {error && (
          <p className="text-red-600 mb-4 text-center font-semibold">{error}</p>
        )}

=======
>>>>>>> 48f0b8939c07e93bfbbfa9709e465889d951542d
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-text-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-text-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
          required
        />

        <button
          type="submit"
<<<<<<< HEAD
          disabled={loading}
          className="w-full bg-primary text-white p-3 rounded-lg font-semibold hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
=======
          className="w-full bg-primary text-white p-3 rounded-lg font-semibold hover:bg-primary-dark transition"
        >
          Login
>>>>>>> 48f0b8939c07e93bfbbfa9709e465889d951542d
        </button>

        <p className="text-text-secondary mt-4 text-center">
          Don't have an account?{" "}
          <Link href="/signup" className="text-secondary hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
