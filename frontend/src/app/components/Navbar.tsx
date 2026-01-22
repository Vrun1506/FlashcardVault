import React, {useState} from "react";
import Image from "next/image";
import NavButton from "./NavButton";

type HeaderProps = {
  activeSection: string;
  setActiveSection: (section: string) => void;
};

const Navbar: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const navItems = ['Home', 'Demo', 'Contact'];
  
  return (
    <header className="bg-slate-50 border-b border-slate-200 px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Image
            src="/assets/logo.png"
            alt="Flashcard Vault"
            width={48}
            height={48}
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
        
        <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors">
          Log In / Register
        </button>
      </div>
    </header>
  );
};

export default Navbar;