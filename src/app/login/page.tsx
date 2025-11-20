"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // مثال مؤقت لتسجيل الدخول
    if (email === "user@example.com" && password === "123456") {
      alert("Login successful!");
      router.push("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/images/login-bg.jpg')",
      }}
    >
      {/* Overlay لتسهيل قراءة النصوص */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Form */}
      <form className="relative z-10 bg-white bg-opacity-90 p-10 rounded-2xl shadow-lg w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-primary text-center">
          Welcome Back
        </h1>

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
          className="w-full bg-primary text-white p-3 rounded-lg font-semibold hover:bg-primary-dark transition"
        >
          Login
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
