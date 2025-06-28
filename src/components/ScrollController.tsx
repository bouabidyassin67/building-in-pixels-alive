
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
    
    // Camera position based on scroll
    const targetY = 2 + progress * 25; // Rise from ground to top
    const targetZ = 15 - progress * 8; // Move closer as we go up
    const targetX = Math.sin(progress * Math.PI * 2) * 3; // Gentle circular movement
    
    // Smooth camera movement
    camera.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.05);
    
    // Look at building with slight offset based on height
    const lookAtY = progress * 12;
    camera.lookAt(0, lookAtY, 0);
  });

  return null;
};
