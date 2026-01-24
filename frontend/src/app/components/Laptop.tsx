import React from "react";

const LaptopScreen = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative mx-auto" style={{ maxWidth: '900px' }}>
      {/* Laptop screen */}
      <div className="relative bg-slate-900 rounded-t-2xl p-3 shadow-2xl">
        {/* Screen bezel */}
        <div className="bg-slate-800 rounded-lg p-1">
          {/* Camera notch */}
          <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-700 rounded-full border border-slate-600"></div>
          
          {/* Screen content */}
          <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg overflow-hidden" style={{ aspectRatio: '16/10' }}>
            {children}
          </div>
        </div>
      </div>
      
      {/* Laptop base */}
      <div className="relative h-6 bg-gradient-to-b from-slate-800 to-slate-900 rounded-b-2xl shadow-xl">
        <div className="absolute inset-x-0 top-0 h-1 bg-slate-700"></div>
      </div>
    </div>
  );
};
export default LaptopScreen;