import React, { useRef, Suspense } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Html } from '@react-three/drei';

export function BuildingGLB(props: any) {
  const group = useRef<Group>(null);
  const gltf = useLoader(GLTFLoader, '/scifi.glb');

  // Log the gltf object to the console for inspection
  console.log("Loaded GLTF object:", gltf);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.001;
    }
  });

  // Check if gltf.scene exists before attempting to clone and render
  if (!gltf || !gltf.scene) {
    console.error("Error: gltf.scene is undefined or null. The GLB model might not have loaded correctly or is corrupted.");
    return (
      <Html center>
        <div style={{ color: 'red', fontSize: '16px' }}>
          Error loading 3D model. Check console for details.
        </div>
      </Html>
    );
  }

  return (
    <group ref={group} {...props}>
      <Suspense fallback={<Html center>Loading GLB...</Html>}>
        <primitive object={gltf.scene.clone()} />
      </Suspense>
    </group>
  );
}
