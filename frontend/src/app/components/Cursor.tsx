import React from "react";

const Cursor = ({ position, visible, scale = 1, clicking = false }: { position: { x: number; y: number }; visible: boolean; scale?: number; clicking?: boolean }) => {
  if (!visible) return null;
  return (
    <div 
      className="absolute pointer-events-none"
      style={{ 
        left: position.x, 
        top: position.y,
        transform: 'translate(-50%, -50%)',
        zIndex: 9999
      }}
    >
      {/* Click ripple effects */}
      {clicking && (
        <>
          <div 
            className="absolute rounded-full"
            style={{
              width: '30px',
              height: '30px',
              left: '-3px',
              top: '-3px',
              background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)',
              animation: 'ripple 0.3s ease-out',
              zIndex: 9999
            }}
          />
          <div 
            className="absolute rounded-full border-4 border-white"
            style={{
              width: '50px',
              height: '50px',
              left: '-13px',
              top: '-13px',
              animation: 'ripple 0.3s ease-out',
              zIndex: 9999
            }}
          />
          <div 
            className="absolute rounded-full border-2 border-yellow-300"
            style={{
              width: '70px',
              height: '70px',
              left: '-23px',
              top: '-23px',
              animation: 'ripple 0.3s ease-out',
              zIndex: 9999
            }}
          />
        </>
      )}
      
      {/* Cursor */}
      <div style={{ transform: `scale(${scale})`, transition: 'transform 0.1s ease-out', zIndex: 9999, position: 'relative' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path 
            d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" 
            fill="#1e40af" 
            stroke="white" 
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
};
export default Cursor;