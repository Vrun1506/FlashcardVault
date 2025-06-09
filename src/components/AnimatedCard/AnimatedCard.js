"use client"; // Indicates that this component is a client component in a Next.js application

import React, { useState, useEffect } from 'react'; // Importing React and the necessary hooks

// Main functional component for the AnimatedCard
export default function AnimatedCard({ children, delay = 0 }) {
  // State to track whether the card is visible or not
  const [isVisible, setIsVisible] = useState(false);

  // Effect to control the visibility of the card based on the delay
  useEffect(() => {
    // Set a timer to update the visibility state after the specified delay
    const timer = setTimeout(() => setIsVisible(true), delay);
    
    // Cleanup function to clear the timer when the component unmounts or delay changes
    return () => clearTimeout(timer);
  }, [delay]); // Dependency array ensures this effect runs when the delay changes

  return (
    <div className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
      {/* Applying transformations based on visibility: 
           - When visible: translate-y-0 (no vertical movement) and opacity-100 (fully visible)
           - When not visible: translate-y-8 (moves down) and opacity-0 (invisible)
      */}
      {children} {/* Rendering any child components or elements passed to AnimatedCard */}
    </div>
  );
}