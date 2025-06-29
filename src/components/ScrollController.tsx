import { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export const ScrollController = () => {
  const { camera } = useThree();
  const scrollProgress = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = Math.min(scrollTop / docHeight, 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    const progress = scrollProgress.current;
    
    // Increased radius by another 10% (from 99 to 109)
    const radius = 109; 
    const angle = progress * Math.PI * 4; // Multiple rotations around the building
    
    // Lower camera positions for better building view
    const startHeight = 25; // Lower starting point
    const maxHeight = 60; // Lower max height
    const height = startHeight + (progress * (maxHeight - startHeight));
    
    // Calculate rotation position
    const targetX = Math.cos(angle) * radius;
    const targetZ = Math.sin(angle) * radius;
    const targetY = height;
    
    // Smooth camera movement
    camera.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.05);
    
    // Always look at the building center
    camera.lookAt(0, 10, 0); // Look at center of building
  });

  return null;
};