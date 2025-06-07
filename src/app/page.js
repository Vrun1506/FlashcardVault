import React from 'react';
import Navbar from '../components/Navbar/navbar'; // Adjust if you're in a subfolder
import ImageSlider from '../components/Slider/slider';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <h1>Welcome to the Home Page</h1>
        <ImageSlider />
        <p>This is the main content of the home page.</p>
        <p>Feel free to explore the site!</p>
        <p>Check out our <a href="/about">About</a> page to learn more.</p>
        <p>Visit our <a href="/products">Products</a> page to see what we offer.</p>
        <p>Enjoy your stay!</p>
      </main>
    </>
  );
}
