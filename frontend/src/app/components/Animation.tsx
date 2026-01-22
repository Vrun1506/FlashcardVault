import React, { useEffect, useRef } from 'react';
import * as THREE from '../../../node_modules/@types/three';


const Animation = () => {
  const mountRef = useRef(null);

  // Add your Three.js animation code here

  return <div ref={mountRef} className="w-full h-full" />;
};

export default Animation;