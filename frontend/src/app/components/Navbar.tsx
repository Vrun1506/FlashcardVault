import React from "react";
import Image from "next/image";
import NavButton from "./NavButton";


const Navbar = ({ activeSection, setActiveSection }: { activeSection: string; setActiveSection: (section: string) => void }) => {
  const navItems = ['Home', 'Demo', 'Contact'];
  
  return (
    <header className="bg-white border-b border-slate-200 px-8 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Image
            src="/assets/logo.png"
            alt="Flashcard Vault"
            width={80}
            height={80}
            className="w-auto h-20"
          />
          <h1 className="text-2xl font-semibold text-slate-800">Flashcard Vault</h1>
        </div>
        <nav className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
          {navItems.map(item => (
            <NavButton
              key={item}
              label={item}
              active={activeSection === item.toLowerCase()}
              onClick={() => setActiveSection(item.toLowerCase())}
            />
          ))}
        </nav>
        <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          Log In / Register
        </button>
      </div>
    </header>
  );
};

export default Navbar;