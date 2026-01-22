"use client";
import React, { useState } from 'react';
import Header from './components/Navbar';
import Animation from './components/Animation';

const HomeScreen = () => {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen bg-slate-50">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="max-w-7xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-slate-800 mb-4">
            Master Your Learning
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Store, organize, and study your flashcards efficiently with Flashcard Vault
          </p>
        </div>
        
        <div className="w-full h-[600px] bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
          <Animation />
        </div>
      </main>
    </div>
  );
};

export default HomeScreen;