import React from "react";

const Feature = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-600">{description}</p>
  </div>
);


export default Feature;