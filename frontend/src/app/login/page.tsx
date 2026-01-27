"use client";
import React, { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client"; // Use the new client
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const supabase = createClient(); 
  
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    // Basic Validation
    if (!isLogin && formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
    }

    try {
        if (isLogin) {
            // LOGIN FLOW
            const { error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });
            if (error) throw error;
            router.push("/"); 
            router.refresh();
        } else {
            // SIGN UP FLOW
            const { error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback`,
                    data: { full_name: formData.name },
                },
            });
            if (error) throw error;
            setMessage("Check your email for the confirmation link!");
        }
    } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-8 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <h1 className="text-xl font-semibold text-slate-800">Flashcard Vault</h1>
          </Link>
        </div>
      </header>
      <main className="max-w-md mx-auto px-6 py-16">
        <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-8">
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-sm font-medium rounded ${isLogin ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-sm font-medium rounded ${!isLogin ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'}`}
            >
              Sign Up
            </button>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              {isLogin ? 'Welcome back' : 'Create account'}
            </h2>
          </div>
          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded">{error}</div>}
          {message && <div className="mb-4 p-3 bg-green-50 text-green-600 text-sm rounded">{message}</div>}

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                name="password"
                type="password"
                required
                minLength={6}
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            {!isLogin && (
               <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
               <input
                 name="confirmPassword"
                 type="password"
                 required
                 minLength={6}
                 value={formData.confirmPassword}
                 onChange={handleInputChange}
                 className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
               />
             </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};
export default LoginPage;