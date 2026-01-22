import React from "react";

interface NavButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavButton = ({ label, active, onClick }: NavButtonProps) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 font-medium transition-colors ${
      active ? 'text-blue-600' : 'text-slate-600 hover:text-blue-500'
    }`}
  >
    {label}
  </button>
);

export default NavButton;