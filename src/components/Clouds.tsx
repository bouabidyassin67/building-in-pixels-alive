import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const Clouds = () => {
  const cloudsRef = useRef<Group>(null);
  // Load the GLB cloud model
  const gltf = useLoader(GLTFLoader, '/cloud1.glb');

  useFrame((state) => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <group ref={cloudsRef}>
      {Array.from({ length: 5 }, (_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        const radius = 45 + Math.random() * 10;
        const y = 22 + Math.sin(i) * 6;
        return (
          <primitive
            key={`cloud-glb-${i}`}
            object={gltf.scene.clone()}
            position={[
              Math.cos(angle) * radius,
              y,
              Math.sin(angle) * radius
            ]}
            rotation={[0, angle + Math.random(), 0]}
            scale={[2.5 + Math.random() * 1.2, 2.5 + Math.random() * 1.2, 2.5 + Math.random() * 1.2]}
          />
        );
      })}
    </group>
  );
};
