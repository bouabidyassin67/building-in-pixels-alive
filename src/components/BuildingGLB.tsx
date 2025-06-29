
import React, { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { useGLTF } from '@react-three/drei';
import { Html } from '@react-three/drei';

export function BuildingGLB(props: any) {
  const group = useRef<Group>(null);
  
  try {
    // Use useGLTF from drei
    const { scene } = useGLTF('/scifi.glb');

    useFrame(() => {
      if (group.current) {
        group.current.rotation.y += 0.001;
      }
    });

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
  } catch (error) {
    console.error("Error loading GLB model:", error);
    return (
      <Html center>
        <div style={{ color: 'red', fontSize: '16px' }}>
          Error loading 3D model. Using fallback building.
        </div>
      </Html>
    );
  }
}

// Preload the model
useGLTF.preload('/scifi.glb');
