
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
    
    // Fixed camera rotation around the building
    const radius = 15; // Keep fixed distance
    const angle = progress * Math.PI * 4; // Multiple rotations around the building
    
    // Start at entrance level (ground floor) and go up floor by floor
    const startHeight = 2; // Entrance level
    const maxHeight = 22; // Top of building
    const height = startHeight + (progress * (maxHeight - startHeight));
    
    // Calculate rotation position
    const targetX = Math.cos(angle) * radius;
    const targetZ = Math.sin(angle) * radius;
    const targetY = height;
    
    // Smooth camera movement
    camera.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.05);
    
    // Always look at the building center at the current height level
    camera.lookAt(0, height, 0);
  });

  return null;
};
