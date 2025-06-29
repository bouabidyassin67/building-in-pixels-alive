
import React, { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { useGLTF } from '@react-three/drei';
import { Html } from '@react-three/drei';

export function BuildingGLB(props: any) {
  const group = useRef<Group>(null);
  
  // Use useGLTF from drei instead of direct GLTFLoader
  const { scene, error } = useGLTF('/scifi.glb');

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.001;
    }
  });

  // Handle loading error
  if (error) {
    console.error("Error loading GLB model:", error);
    return (
      <Html center>
        <div style={{ color: 'red', fontSize: '16px' }}>
          Error loading 3D model. Check if scifi.glb exists in public folder.
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
      <primitive object={scene} />
    </group>
  );
}

// Preload the model
useGLTF.preload('/scifi.glb');
