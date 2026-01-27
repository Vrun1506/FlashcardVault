"use client";
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Flashcard from './Flashcard';
import Cursor from './Cursor';

const Animation = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: -1000, y: -1000 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorScale] = useState(1);
  const [cursorClicking] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe2e8f0);

    // 🎯 ADJUSTED CAMERA: Moved back to accommodate larger cards
    const camera = new THREE.PerspectiveCamera(50, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.set(0, 2, 10); // Changed from (0, 1.5, 8) to (0, 2, 10)
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.shadowMap.enabled = true;
    currentMount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Image configuration with for loop
    const cardColors = [0x3b82f6, 0x60a5fa, 0x2563eb, 0x1e40af];
    const cardConfigs = [];
    
    for (let i = 0; i < cardColors.length; i++) {
      const cardNumber = i + 1;
      cardConfigs.push({
        color: cardColors[i],
        frontImage: `/assets/F${cardNumber}_Q.jpg`,
        backImage: `/assets/F${cardNumber}_A.jpg`
      });
    }

    const flashcards = cardConfigs.map((config, i) => {
      const card = new Flashcard(config.color, i, config.frontImage, config.backImage);
      card.addToScene(scene);
      return card;
    });

    // 🎯 ADJUSTED GALLERY POSITION: Positioned to keep cards within laptop bounds
    const galleryX = -3; // Moved right to prevent overflow
    const gallerySpacing = 0.4; // Increased from 0.3 to 0.4
    const galleryY = 0;

    let globalAnimationProgress = 0;
    let isAnimating = true;
    let animationStartTime = Date.now();
    const perCardDuration = 4000;
    const pauseBeforeRepeat = 1500;
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = Date.now();

      if (!isAnimating && time - animationStartTime > pauseBeforeRepeat) {
        isAnimating = true;
        animationStartTime = time;
        globalAnimationProgress = 0;
      }

      if (isAnimating) {
        globalAnimationProgress += delta * 1000;
        const currentCardIndex = Math.floor(globalAnimationProgress / perCardDuration);
        const cardProgress = (globalAnimationProgress % perCardDuration) / perCardDuration;

        flashcards.forEach((card, i) => {
          const galleryPosition = i - currentCardIndex;
          const galleryX_pos = galleryX - (galleryPosition * gallerySpacing);

          if (i < currentCardIndex) {
            const finalPosition = i + (flashcards.length - currentCardIndex);
            card.updatePosition(galleryX - (finalPosition * gallerySpacing), galleryY, 0);
            card.updateRotation(0, Math.PI / 2, 0);
          } else if (i === currentCardIndex && currentCardIndex < flashcards.length) {
            if (cardProgress < 0.15) {
              const moveProgress = cardProgress / 0.15;
              const easedMove = 1 - Math.pow(1 - moveProgress, 3);
              card.updatePosition(galleryX_pos + (0 - galleryX_pos) * easedMove, galleryY + (0 - galleryY) * easedMove, 0);
              card.updateRotation(0, Math.PI / 2, 0);
              setCursorVisible(false);
            }
            else if (cardProgress < 0.28) {
              const rotateProgress = (cardProgress - 0.15) / 0.13;
              card.updatePosition(0, 0, 0);
              card.updateRotation(0, Math.PI / 2 - (rotateProgress * Math.PI / 2), 0);
              setCursorVisible(false);
            }
            else if (cardProgress < 0.48) {
              const cursorProgress = (cardProgress - 0.28) / 0.20;
              card.updatePosition(0, 0, 0);
              card.updateRotation(0, 0, 0);
              const cardWorldPos = new THREE.Vector3(0, 0, 0);
              const cardScreenPos = cardWorldPos.project(camera);
              const startX = currentMount.clientWidth * 0.15;
              const startY = currentMount.clientHeight * 0.85;
              const targetX = (cardScreenPos.x * 0.5 + 0.5) * currentMount.clientWidth;
              const targetY = (-(cardScreenPos.y * 0.5) + 0.5) * currentMount.clientHeight;
              setCursorPosition({ x: startX + (targetX - startX) * cursorProgress, y: startY + (targetY - startY) * cursorProgress });
              setCursorVisible(true);
            }
            else if (cardProgress < 0.52) {
              setCursorVisible(true);
            }
            else if (cardProgress < 0.68) {
              const flipProgress = (cardProgress - 0.52) / 0.16;
              card.updatePosition(0, 0, 0);
              card.updateRotation(0, flipProgress * Math.PI, 0);
              setCursorVisible(false);
            }
            else if (cardProgress < 0.78) {
              card.updateRotation(0, Math.PI, 0);
            }
            else if (cardProgress < 0.88) {
              const flipBackProgress = (cardProgress - 0.78) / 0.10;
              card.updateRotation(0, Math.PI - (flipBackProgress * Math.PI), 0);
            }
            else {
              const returnProgress = (cardProgress - 0.88) / 0.12;
              const targetX = galleryX - (flashcards.length * gallerySpacing);
              card.updatePosition(0 + (targetX - 0) * returnProgress, 0, 0);
              card.updateRotation(0, (Math.PI / 2) * returnProgress, 0);
            }
          } else {
            card.updatePosition(galleryX_pos, galleryY, 0);
            card.updateRotation(0, Math.PI / 2, 0);
          }
        });

        if (globalAnimationProgress >= flashcards.length * perCardDuration) {
          isAnimating = false;
          animationStartTime = Date.now();
        }
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      flashcards.forEach(card => card.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={mountRef} className="w-full h-full" />
      <Cursor position={cursorPosition} visible={cursorVisible} scale={cursorScale} clicking={cursorClicking} />
    </div>
  );
};

export default Animation;