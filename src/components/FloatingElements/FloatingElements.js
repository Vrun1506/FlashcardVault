"use client"; // Indicates that this component is a client component in a Next.js application

import React from 'react'; // Importing React

// Main functional component for rendering floating decorative elements
export default function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none"> {/* Container for floating elements */}
      {/* First floating element - a circle with a gradient background and pulsing animation */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-rose-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
      {/* Second floating element - a smaller circle with a different gradient and bouncing animation */}
      <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-20 animate-bounce" style={{animationDelay: '1s'}}></div>
      {/* Third floating element - another circle with a yellow to orange gradient and pulsing animation */}
      <div className="absolute bottom-32 left-32 w-20 h-20 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      {/* Fourth floating element - a circle with a green to emerald gradient and bouncing animation */}
      <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full opacity-20 animate-bounce" style={{animationDelay: '0.5s'}}></div>
    </div>
  );
}