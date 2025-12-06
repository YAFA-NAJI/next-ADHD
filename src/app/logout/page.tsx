<<<<<<< HEAD
// src/app/context/AuthContext.tsx

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from 'next/navigation';

// Define the User type
interface User {
  id: string;
  email: string;
}

// Define the context type, including the signOut function
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for an active session on initial load
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email || "" });
      }
      setIsLoading(false);
    });

    // Listen for auth state changes (login, logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email || "" });
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription on component unmount
    return () => subscription?.unsubscribe();
  }, []);

  // Define the signOut function
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    // --- THIS IS THE CORRECTED REDIRECT ---
    router.push('/login'); 
  };

  // Provide the context value to children
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
=======
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
>>>>>>> 48f0b8939c07e93bfbbfa9709e465889d951542d
