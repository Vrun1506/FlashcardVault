"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar/navbar";
import FloatingElements from "@/components/FloatingElements/FloatingElements";

export default function AuthComponent({ handleLoginSubmit, handleRegisterSubmit, error }) {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <>
      <Navbar />


      {/* Page background - white */}
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        {/* Auth Container (dark dialog box) */}
        <div className="relative z-10 w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-xl">
          {/* Tabs */}
          <div className="flex space-x-4 justify-center mb-6">
            <button
              className={`text-lg font-semibold px-4 py-2 transition-all duration-300 ${
                activeTab === "login" ? "text-white border-b-2 border-white" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("login")}
            >
              Log In
            </button>
            <button
              className={`text-lg font-semibold px-4 py-2 transition-all duration-300 ${
                activeTab === "register" ? "text-white border-b-2 border-white" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>

          {/* Form Container with AnimatePresence */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTab === "login" && (
                <motion.form
                  key="login"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="space-y-5"
                  onSubmit={handleLoginSubmit}
                >
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300"
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300"
                  />
                  {error && (
                    <div className="text-red-600 text-sm font-bold text-center p-2 rounded-md">
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
                  >
                    Log In
                  </button>
                </motion.form>
              )}

              {activeTab === "register" && (
                <motion.form
                  key="register"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="space-y-5"
                  onSubmit={handleRegisterSubmit}
                >
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300"
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300"
                  />
                  <input
                    type="password"
                    name="repeat-password"
                    placeholder="Repeat Password"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-all duration-300"
                  >
                    Register
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
