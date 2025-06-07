"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './slider.module.css';


export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "/images/image1.jpg",
    "/images/image2.png",
    "/images/image3.png"
  ];

  function handlePrevClick() {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }

  function handleNextClick() {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % images.length
    );
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
        <div className={styles.slider}>
        {images.map((image, index) => (
            <Image
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            width={800}
            height={400}
            className={index === currentIndex ? `${styles.slide} ${styles.active}` : styles.slide}
            />
        ))}
        </div>

        <button className={styles['prev-image']} onClick={handlePrevClick}>⬅</button>
        <button className={styles['next-image']} onClick={handleNextClick}>➡</button>
    </>
  );
}
