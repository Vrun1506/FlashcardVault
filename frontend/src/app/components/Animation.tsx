import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Flashcard from './Flashcard';
import Cursor from './Cursor';

const Animation = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: -1000, y: -1000 });
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe2e8f0);

    const camera = new THREE.PerspectiveCamera(
      50,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.5, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.shadowMap.enabled = true;
    currentMount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const cardColors = [0x3b82f6, 0x60a5fa, 0x2563eb, 0x1e40af];
    const cardConfigs = cardColors.map(color => ({ color, frontImage: "", backImage: "" }));

    const flashcards = cardConfigs.map((config, i) => {
      const card = new Flashcard(config.color, i, config.frontImage, config.backImage);
      card.addToScene(scene);
      return card;
    });

    // Gallery position on the left (horizontal stack)
    const galleryX = -3.5;
    const gallerySpacing = 0.3; // Horizontal spacing between cards
    const galleryY = 0; // Keep all cards at same Y position

    // Initialise cards in gallery view on the left
    flashcards.forEach((card, i) => {
      card.updatePosition(galleryX - (i * gallerySpacing), galleryY, 0);
      card.updateRotation(0, Math.PI / 2, 0);
    });

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
            // Move the finished card to the back of the gallery stack
            const finalPosition = i + (flashcards.length - currentCardIndex);
            const finalX = galleryX - (finalPosition * gallerySpacing);
            card.updatePosition(finalX, galleryY, 0);
            card.updateRotation(0, Math.PI / 2, 0);
          } else if (i === currentCardIndex && currentCardIndex < flashcards.length) {
            // Current card animating
            
            // Move the card from the gallery to the centre of the laptop screen
            if (cardProgress < 0.15) {
              const moveProgress = cardProgress / 0.15;
              const easedMove = 1 - Math.pow(1 - moveProgress, 3);
              const startX = galleryX_pos;
              const targetX = 0;
              const startY = galleryY;
              const targetY = 0;
              
              card.updatePosition(
                startX + (targetX - startX) * easedMove,
                startY + (targetY - startY) * easedMove,
                0
              );
              card.updateRotation(0, Math.PI / 2, 0);
              setCursorVisible(false);
            }
            // Need to rotate card to face the user from the side gallery
            else if (cardProgress < 0.28) {
              const rotateProgress = (cardProgress - 0.15) / 0.13;
              const easeRotate = 1 - Math.pow(1 - rotateProgress, 2);
              card.updatePosition(0, 0, 0);
              card.updateRotation(0, Math.PI / 2 - (easeRotate * Math.PI / 2), 0);
              setCursorVisible(false);
            }
            // Cursor moves to card and clicks to rotate
            else if (cardProgress < 0.48) {
              const cursorProgress = (cardProgress - 0.28) / 0.20;
              const easedCursor = cursorProgress < 0.5 
                ? 2 * cursorProgress * cursorProgress 
                : 1 - Math.pow(-2 * cursorProgress + 2, 2) / 2;
              
              card.updatePosition(0, 0, 0);
              card.updateRotation(0, 0, 0);
              
              const cardWorldPos = new THREE.Vector3(0, 0, 0);
              const cardScreenPos = cardWorldPos.project(camera);
              const startX = currentMount.clientWidth * 0.15;
              const startY = currentMount.clientHeight * 0.85;
              const targetX = (cardScreenPos.x * 0.5 + 0.5) * currentMount.clientWidth;
              const targetY = (-(cardScreenPos.y * 0.5) + 0.5) * currentMount.clientHeight;
              
              setCursorPosition({
                x: startX + (targetX - startX) * easedCursor,
                y: startY + (targetY - startY) * easedCursor
              });
              setCursorVisible(true);
            }
            // Phase 4: Click (0.48 - 0.52)
            else if (cardProgress < 0.52) {
              card.updatePosition(0, 0, 0);
              card.updateRotation(0, 0, 0);
              
              const cardWorldPos = new THREE.Vector3(0, 0, 0);
              const cardScreenPos = cardWorldPos.project(camera);
              setCursorPosition({
                x: (cardScreenPos.x * 0.5 + 0.5) * currentMount.clientWidth,
                y: (-(cardScreenPos.y * 0.5) + 0.5) * currentMount.clientHeight
              });
              setCursorVisible(true);
            }
            // Phase 5: Flip card (0.52 - 0.68)
            else if (cardProgress < 0.68) {
              const flipProgress = (cardProgress - 0.52) / 0.16;
              const easeFlip = flipProgress < 0.5 
                ? 2 * flipProgress * flipProgress 
                : 1 - Math.pow(-2 * flipProgress + 2, 2) / 2;
              
              card.updatePosition(0, 0, 0);
              card.updateRotation(0, easeFlip * Math.PI, 0);
              setCursorVisible(false);
            }
            // Phase 6: Brief pause showing back (0.68 - 0.78)
            else if (cardProgress < 0.78) {
              card.updatePosition(0, 0, 0);
              card.updateRotation(0, Math.PI, 0);
              setCursorVisible(false);
            }
            // Flip back to front
            else if (cardProgress < 0.88) {
              const flipBackProgress = (cardProgress - 0.78) / 0.10;
              const easeFlipBack = flipBackProgress < 0.5 
                ? 2 * flipBackProgress * flipBackProgress 
                : 1 - Math.pow(-2 * flipBackProgress + 2, 2) / 2;
              
              card.updatePosition(0, 0, 0);
              card.updateRotation(0, Math.PI - (easeFlipBack * Math.PI), 0);
              setCursorVisible(false);
            }
            // Return card to back of gallery
            else {
              const returnProgress = (cardProgress - 0.88) / 0.12;
              const easedReturn = returnProgress * returnProgress * returnProgress;
              const targetPosition = flashcards.length;
              const targetX = galleryX - (targetPosition * gallerySpacing);
              
              card.updatePosition(
                0 + (targetX - 0) * easedReturn,
                0 + (galleryY - 0) * easedReturn,
                0
              );
              card.updateRotation(0, (Math.PI / 2) * easedReturn, 0);
              setCursorVisible(false);
            }
          } else {
            // Cards waiting in gallery - move forward
            let adjustedX = galleryX_pos;
            
            if (currentCardIndex < flashcards.length && i > currentCardIndex && cardProgress >= 0.88) {
              // Move cards forward to make room for returning card
              const moveProgress = (cardProgress - 0.88) / 0.12;
              const easedMove = moveProgress * moveProgress * moveProgress;
              const shiftAmount = gallerySpacing * easedMove;
              adjustedX = galleryX_pos + shiftAmount;
            }
            
            card.updatePosition(adjustedX, galleryY, 0);
            card.updateRotation(0, Math.PI / 2, 0);
          }
        });

        // Check if animation cycle is complete
        if (globalAnimationProgress >= flashcards.length * perCardDuration) {
          isAnimating = false;
          animationStartTime = Date.now();
          
          // Reset all cards to gallery
          flashcards.forEach((card, i) => {
            card.updatePosition(galleryX - (i * gallerySpacing), galleryY, 0);
            card.updateRotation(0, Math.PI / 2, 0);
          });
          setCursorVisible(false);
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
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
      <Cursor position={cursorPosition} visible={cursorVisible} />
    </div>
  );
};

export default Animation;