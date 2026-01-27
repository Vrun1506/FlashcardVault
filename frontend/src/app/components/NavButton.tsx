import React from "react";
import Link from "next/link";

const NavButton = ({ 
  label, 
  href, 
  active, 
  onClick 
}: { 
  label: string; 
  href: string; 
  active: boolean; 
  onClick: () => void 
}) => (
  <Link
    href={href}
    onClick={onClick}
    className={`px-6 py-2 font-medium transition-colors ${
      active ? 'text-blue-600' : 'text-slate-600 hover:text-blue-500'
    }`}
  >
    {label}
  </Link>
);

export default NavButton;