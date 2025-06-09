"use client"; // Indicates that this component is a client component in a Next.js application

import React, { useState, useEffect } from 'react'; // Importing React and necessary hooks
import Image from 'next/image'; // Importing Next.js Image component for optimized images
import styles from './slider.module.css'; // Importing CSS module for styling the slider

// Main functional component for the Image Slider
export default function ImageSlider() {
  // State to keep track of the current image index being displayed
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // State to control whether the slideshow is playing or paused
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Array of images with their source, title, and description
  const images = [
    {
      src: "/images/image1.jpg",
      title: "Beautiful Landscape",
      description: "Discover breathtaking natural scenery"
    },
    {
      src: "/images/image2.png",
      title: "Urban Architecture",
      description: "Modern cityscapes and stunning designs"
    },
    {
      src: "/images/image3.png",
      title: "Artistic Vision",
      description: "Creative expressions and visual art"
    }
  ];

  // Function to handle the "previous" button click
  function handlePrevClick() {
    setCurrentIndex((prevIndex) =>
      // If at the first image, wrap around to the last image
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }

  // Function to handle the "next" button click
  function handleNextClick() {
    setCurrentIndex((prevIndex) =>
      // Move to the next image, wrapping around to the first image if at the end
      (prevIndex + 1) % images.length
    );
  }

  // Function to handle clicking on an indicator button
  function handleIndicatorClick(index) {
    setCurrentIndex(index); // Update current index to the clicked indicator index
  }

  // Function to toggle between play and pause states
  function togglePlayPause() {
    setIsPlaying(!isPlaying); // Toggle the isPlaying state
  }

  // Effect to automatically change images when playing
  useEffect(() => {
    if (!isPlaying) return; // Exit if not playing
    
    // Set an interval to change the image every 3 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3000 milliseconds = 3 seconds
    
    // Cleanup function to clear the interval when the component unmounts or isPlaying changes
    return () => clearInterval(interval);
  }, [images.length, isPlaying]); // Dependencies: runs when images.length or isPlaying changes

  return (
    <div className={styles.slider}> {/* Main container for the image slider */}
      {/* Mapping over images to render each image */}
      {images.map((image, index) => (
        <Image
          key={index} // Unique key for each image
          src={image.src} // Image source
          alt={`Slide ${index + 1}`} // Alt text for accessibility
          width={800} // Width of the image
          height={400} // Height of the image
          className={index === currentIndex ? `${styles.slide} ${styles.active}` : styles.slide} // Active class for current image
        />
      ))}
      
      {/* Button to navigate to the previous image */}
      <button className={styles['prev-image']} onClick={handlePrevClick}>
        ⬅ {/* Left arrow icon */}
      </button>
      {/* Button to navigate to the next image */}
      <button className={styles['next-image']} onClick={handleNextClick}>
        ➡ {/* Right arrow icon */}
      </button>
      
      {/* Container for image indicators */}
      <div className={styles.indicators}>
        {images.map((_, index) => ( // Mapping over images to create indicator buttons
          <button
            key={index} // Unique key for each indicator
            className={index === currentIndex ? `${styles.indicator} ${styles.active}` : styles.indicator} // Active class for current indicator
            onClick={() => handleIndicatorClick(index)} // Click handler to change image
          />
        ))}
      </div>
      
      {/* Progress bar for visual indication of the slideshow */}
      <div className={styles['progress-bar']}></div>
      
      {/* Container for slide content (title and description) */}
      <div className={styles['slide-content']}>
        <h3 className={styles['slide-title']}>{images[currentIndex].title}</h3> {/* Title of the current image */}
        <p className={styles['slide-description']}>{images[currentIndex].description}</p> {/* Description of the current image */}
      </div>
    </div>
  );
}