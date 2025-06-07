"use client";

import React from 'react';
import Navbar from '../components/Navbar/navbar'; // Adjust if you're in a subfolder
import styles from './aboutpage.module.css';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <h1>About</h1>
        <p>Welcome to my website!</p>
        <p>Our team is passionate about what we do and we strive to exceed your expectations.</p>
        <p>As a current university student who went through exams myself, I understand the stress and anxiety around exams and the pressure surrounding your performance</p>
        <p>We are committed to providing you with the best experience possible, whether you&apos;re here to learn, shop, or just explore.</p>
        <p>Our missions is to help you, the student, ace your exams one card at a time</p>
        <p>My website sells premium tried and tested flashcards at extremely affordable rates and see some of the results for yourself!</p>
        <Image
          src="/images/about-us.jpg"
          alt="About Us"
          width={600}
          height={400}
          className={styles.aboutImage}
        />
        <p>Feel free to explore our site and learn more about us!</p>
      </main>
    </>
  );
}