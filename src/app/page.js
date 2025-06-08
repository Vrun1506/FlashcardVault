"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/navbar';
import ImageSlider from '../components/Slider/slider';
import './globals.css'; // Import the CSS file

export default function HomePage() {
  const [backendMessage, setBackendMessage] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/hello')
      .then((res) => res.json())
      .then((data) => setBackendMessage(data.message))
      .catch((err) => console.error('Error fetching backend message:', err));
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <h1>Welcome to the Home Page</h1>
        <br></br>
        <br></br>
        {backendMessage && (
          <p><strong>Backend says:</strong> {backendMessage}</p>
        )}
        <ImageSlider />
        <br></br>
        <br></br>
        <p>This is the main content of the home page.</p>
        <p>Feel free to explore the site!</p>
        <p>Check out our <a href="/about">About</a> page to learn more.</p>
        <p>Visit our <a href="/products">Products</a> page to see what we offer.</p>
        <p>Enjoy your stay!</p>
      </main>
    </>
  );
}
