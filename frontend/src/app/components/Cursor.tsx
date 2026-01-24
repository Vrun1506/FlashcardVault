import React from "react";

const Cursor = ({ position, visible }: { position: { x: number; y: number }; visible: boolean }) => {
  if (!visible) return null;
  return (
    <div 
      className="absolute pointer-events-none z-10 transition-all duration-200"
      style={{ 
        left: position.x, 
        top: position.y,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path 
          d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" 
          fill="#1e40af" 
          stroke="white" 
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};

export default Cursor;