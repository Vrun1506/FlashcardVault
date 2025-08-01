import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-black text-white py-10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center sm:items-start sm:text-left">
            
            {/* Link Section */}
            <div className="mb-6 text-sm text-gray-300 flex flex-col gap-2">
              <Link 
              href="/about" 
              className="hover:text-white transition"
              >About
              </Link>
      
              <Link 
              href="/contact" 
              className="hover:text-white transition"
              >Contact
              </Link>

              <Link 
              href="/privacy-policy" 
              className="hover:text-white transition"
              >Privacy Policy
              </Link>

              <Link 
              href="/tos" 
              className="hover:text-white transition"
              >Terms of Service
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} Flashcard Vault. All rights reserved.
            </p>
          </div>
        </footer>
    )
}
