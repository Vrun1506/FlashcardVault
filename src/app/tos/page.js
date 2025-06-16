import React from 'react';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/Footer';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});
export const metadata = {
  title: 'Terms of Service - Flashcard Vault',
  description: 'Read our terms of service for using Flashcard Vault.',
};
export default function TermsOfServicePage() {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <main className="max-w-4xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
          <p>Last updated: [Insert Date]</p>
          <p>
            Welcome to Flashcard Vault! By using our website, you agree to comply with and be bound by the following terms and conditions of use.
          </p>
          <h2 className="text-2xl font-semibold mt-6">1. Acceptance of Terms</h2>
          <p>By accessing or using our services, you agree to these terms. If you do not agree, please do not use our services.</p>
          <h2 className="text-2xl font-semibold mt-6">2. Changes to Terms</h2>
          <p>We may update these terms from time to time. We will notify you of any changes by posting the new terms on this page.</p>
          <h2 className="text-2xl font-semibold mt-6">3. User Responsibilities</h2>
          <p>You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
          <h2 className="text-2xl font-semibold mt-6">4. Intellectual Property</h2>
          <p>All content on this site, including text, graphics, logos, and images, is the property of Flashcard Vault or its content suppliers and is protected by copyright and other intellectual property laws.</p>
          <h2 className="text-2xl font-semibold mt-6">5. Limitation of Liability</h2>
          <p>Flashcard Vault will not be liable for any damages arising from the use or inability to use our services.</p>
          <h2 className="text-2xl font-semibold mt-6">6. Governing Law</h2>
          <p>These terms are governed by the laws of [Your Country/State].</p>
        </main>
        <Footer />
      </body>
    </html>
  );
}


