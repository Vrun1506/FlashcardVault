"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import Navbar from "../components/Navbar";

export default function SettingsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
      }
      setLoading(false);
    };
    fetchUser();
  }, [supabase, router]);

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    
    // 👇 UPDATED: Points to the callback route with the correct 'next' parameter
    const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ 
        type: 'success', 
        text: "Verification email sent! Follow the link in your inbox to securely update your password." 
      });
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you absolutely sure? This action is permanent and will delete all your generated flashcards and account data."
    );
    if (!confirmed) return;

    // Placeholder: Account deletion requires a backend Service Role key for security.
    alert("In production, this would call your FastAPI /delete-account route. Signing you out for now.");
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar activeSection="settings" />
      
      <main className="max-w-3xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Settings</h1>
          <p className="text-slate-600 mt-2">Manage your account profile and security preferences.</p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${
            message.type === 'success' 
              ? 'bg-green-50 border-green-100 text-green-700' 
              : 'bg-red-50 border-red-100 text-red-700'
          }`}>
            {message.type === 'success' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className="text-sm font-medium">{message.text}</span>
          </div>
        )}

        <div className="space-y-6">
          {/* Email Information */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 overflow-hidden">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Account Profile</h2>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">Email Address</label>
              <div className="flex items-center gap-2">
                <p className="text-lg font-medium text-slate-800">{user?.email}</p>
                <div className="bg-blue-50 text-blue-600 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">Verified</div>
              </div>
            </div>
          </section>

          {/* Security Management */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Security</h2>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-slate-800 font-semibold">Change Password</h3>
                <p className="text-sm text-slate-500">We&apos;ll send a secure link to your email to verify your identity before resetting.</p>
              </div>
              <button 
                onClick={handlePasswordReset} 
                className="whitespace-nowrap px-6 py-2 bg-blue-50 text-blue-600 font-semibold rounded-lg hover:bg-blue-100 transition-all active:scale-95"
              >
                Reset Password
              </button>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="bg-red-50/50 rounded-xl border border-red-100 p-6">
            <h2 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-4">Danger Zone</h2>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-red-800 font-semibold">Delete Account</h3>
                <p className="text-sm text-red-600/70">Permanently remove your account, subscription, and all data from our vault.</p>
              </div>
              <button 
                onClick={handleDeleteAccount} 
                className="whitespace-nowrap px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all active:scale-95 shadow-sm shadow-red-200"
              >
                Delete Account
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}