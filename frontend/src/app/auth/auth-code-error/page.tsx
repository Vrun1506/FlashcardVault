"use client";
import React from "react";
import Link from "next/link";

const AuthCodeErrorPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Authentication Error</h2>
          <p className="text-slate-600 mb-6">Your link may have expired or was already used. Please request a new one.</p>
          <Link href="/login" className="block w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">Go to Login</Link>
        </div>
    </div>
  );
};

export default AuthCodeErrorPage;