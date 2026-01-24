"use client";
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Animation from './components/Animation';
import Laptop from './components/Laptop';
import Feature from './components/Features';


const HomeScreen = () => {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold text-slate-800 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-blue-600">
            Master Your Learning
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Helping you achieve your study goals, one card at a time
          </p>
        </div>

        <div className="relative mb-16">
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          <Laptop>
            <Animation />
          </Laptop>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <Feature
            icon={
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            }
            title="Anki support"
            description="Export your flashcards directly to Anki for seamless integration"
          />

          <Feature
            icon={
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            }
            title="Organize"
            description="Keep your study materials neatly organized in decks"
          />

          <Feature
            icon={
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            }
            title="Track Progress"
            description="Monitor your learning journey with detailed analytics"
          />
        </div>
      </main>
    </div>
  );
};

export default HomeScreen;