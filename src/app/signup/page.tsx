"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Account created successfully!");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background-light">
      <form className="bg-surface-light p-8 rounded shadow-md w-full max-w-sm" onSubmit={handleSignUp}>
        <h1 className="text-2xl font-bold mb-6 text-center text-secondary">
          Sign Up
        </h1>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border border-text-secondary rounded focus:outline-none focus:ring-2 focus:ring-secondary-dark"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-text-secondary rounded focus:outline-none focus:ring-2 focus:ring-secondary-dark"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-text-secondary rounded focus:outline-none focus:ring-2 focus:ring-secondary-dark"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-text-secondary rounded focus:outline-none focus:ring-2 focus:ring-secondary-dark"
          required
        />
        <button
          type="submit"
          className="w-full bg-secondary text-background-light p-2 rounded hover:bg-secondary-dark transition"
        >
          Create Account
        </button>
        <p className="text-text-secondary mt-4 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
