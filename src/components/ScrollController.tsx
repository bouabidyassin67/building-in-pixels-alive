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
    
    // Much larger radius - 200% more zoom out (from 60 to 180)
    const radius = 180; 
    const angle = progress * Math.PI * 4; // Multiple rotations around the building
    
    // Much higher camera positions for aerial overview
    const startHeight = 45; // Much higher starting point
    const maxHeight = 120; // Very high max height for complete overview
    const height = startHeight + (progress * (maxHeight - startHeight));
    
    // Calculate rotation position
    const targetX = Math.cos(angle) * radius;
    const targetZ = Math.sin(angle) * radius;
    const targetY = height;
    
    // Smooth camera movement
    camera.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.05);
    
    // Always look at the building center
    camera.lookAt(0, 15, 0); // Look at center of building
  });

  return null;
};