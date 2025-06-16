"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar/navbar";
import Footer from "@/components/Footer/Footer";

export default function AuthComponent({ error }) {
  const [activeTab, setActiveTab] = useState("login");
  const [loginMessage, setLoginMessage] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Backend URL - matching your Flask server exactly
  const API_BASE_URL = "http://127.0.0.1:5000";

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setRegisterMessage("");

    const form = e.target;
    const formData = new FormData(form);

    const data = {
      first_name: formData.get("first-name"),
      surname: formData.get("surname"),
      email: formData.get("email"),
      password: formData.get("password"),
      repeat_password: formData.get("repeat-password"),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setRegisterMessage(result.message || "Registration successful!");
      
      // Optional: Clear form on success
      if (response.ok) {
        form.reset();
      }
    } catch (err) {
      console.error("Registration error:", err);
      setRegisterMessage("Registration failed. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginMessage("");

    const form = e.target;
    const formData = new FormData(form);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setLoginMessage(result.message || "Login successful!");
    } catch (err) {
      console.error("Login error:", err);
      setLoginMessage("Login failed. Please check your credentials and connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>

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
              onClick={() => {
                setActiveTab("login");
                setLoginMessage("");
                setRegisterMessage("");
              }}
              disabled={isLoading}
            >
              Log In
            </button>
            <button
              className={`text-lg font-semibold px-4 py-2 transition-all duration-300 ${
                activeTab === "register" ? "text-white border-b-2 border-white" : "text-gray-400"
              }`}
              onClick={() => {
                setActiveTab("register");
                setLoginMessage("");
                setRegisterMessage("");
              }}
              disabled={isLoading}
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
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300 disabled:opacity-50"
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300 disabled:opacity-50"
                  />
                  {error && (
                    <div className="text-red-400 text-sm font-bold text-center p-2 rounded-md">
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Logging in..." : "Log In"}
                  </button>
                  {loginMessage && (
                    <p className={`text-center mt-2 font-semibold ${
                      loginMessage.includes("failed") ? "text-red-400" : "text-green-400"
                    }`}>
                      {loginMessage}
                    </p>
                  )}
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
                    type="text"
                    name="first-name"
                    placeholder="First Name"
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300 disabled:opacity-50"
                  />
                  <input
                    type="text"
                    name="surname"
                    placeholder="Surname"
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300 disabled:opacity-50"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300 disabled:opacity-50"
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300 disabled:opacity-50"
                  />
                  <input
                    type="password"
                    name="repeat-password"
                    placeholder="Repeat Password"
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Registering..." : "Register"}
                  </button>
                  {registerMessage && (
                    <p className={`text-center mt-2 font-semibold ${
                      registerMessage.includes("failed") ? "text-red-400" : "text-green-400"
                    }`}>
                      {registerMessage}
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}