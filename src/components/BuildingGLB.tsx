
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { useGLTF } from '@react-three/drei';
import { Html } from '@react-three/drei';

export function BuildingGLB(props: any) {
  const group = useRef<Group>(null);
  
  // Use useGLTF hook properly - it handles loading states internally
  const { scene, error } = useGLTF('/scifi.glb');

  useFrame(() => {
    if (group.current && scene) {
      group.current.rotation.y += 0.001;
    }
  });

  // Handle error state
  if (error) {
    console.error("GLB loading error:", error);
    return (
      <Html center>
        <div style={{ color: 'red', fontSize: '16px' }}>
          3D model failed to load. Using fallback.
        </div>
      </Html>
    );
  }

  // Handle missing scene
  if (!scene) {
    return (
      <Html center>
        <div style={{ color: 'white', fontSize: '16px' }}>
          Loading 3D model...
        </div>
      </Html>
    );
  }

  return (
    <group ref={group} {...props}>
      <primitive object={scene.clone()} />
    </group>
  );
}

// Preload the model
useGLTF.preload('/scifi.glb');
