"use client"; // Indicates that this component is a client component in a Next.js application
import React, { useState } from 'react'; // Importing React and the useState hook
import { Menu, X } from 'lucide-react'; // Importing Menu and X icons from Lucide
import Link from 'next/link'; // Importing Link component from Next.js for client-side navigation

// Array of navigation links with their corresponding URLs and labels
const navLinks = [
  { href: "/", label: "Home" }, // Home link
  { href: "/products", label: "Products" }, // Products link
  { href: "/aigenerator", label: "Flashcard Maker AI" }, // Contact link
  { href: "/pricing", label: "Pricing" }, // About link
];

// Main functional component for the Navbar
export default function Navbar() {
  // State to control the visibility of the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-100"> {/* Navbar container with styles */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center"> {/* Flex container for navbar content */}
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent tracking-tight"> {/* Logo with gradient text */}
          <Link href="/">
            Flashcard Vault
          </Link>
        </div>

        <ul className="hidden md:flex items-center space-x-8"> {/* Desktop navigation links, hidden on mobile */}
          {navLinks.map(({ href, label }) => ( // Mapping over the navigation links array
            <li key={href}> {/* List item for each link */}
              <Link href={href} className="relative text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 group"> {/* Link element */}
                <span className="relative px-1 py-1"> {/* Span for text and hover effect */}
                  {label} {/* Link label */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-800 transition-all duration-300 group-hover:w-full"></span> {/* Animated underline effect */}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center space-x-4"> {/* Flex container for buttons */}
          <Link href="/login" className="hidden md:block bg-gradient-to-r from-blue-500 to-blue-800 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"> {/* Log In/Register button, hidden on mobile */}
            Log In / Register
          </Link>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}> {/* Mobile menu toggle button */}
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />} {/* Toggle icon: X when open, Menu when closed */}
          </button>
        </div>
      </div>

      {isMenuOpen && ( // Conditional rendering for mobile menu
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100"> {/* Mobile menu container */}
          <div className="px-6 py-4 space-y-4"> {/* Inner container for mobile links */}
            {navLinks.map(({ href, label }) => ( // Mapping over the navigation links for mobile
              <Link key={href} href={href} className="block text-gray-700 hover:text-blue-500 font-medium"> {/* Mobile link element */}
                {label} {/* Link label */}
              </Link>
            ))}
            <Link
              href="/login"
              className="block w-full bg-gradient-to-r from-blue-500 to-blue-800 text-white px-6 py-2.5 rounded-full text-sm font-semibold text-center"
            >
              Log In / Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}