
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

export const Clouds = () => {
  const cloudsRef = useRef<Group>(null);

  useFrame((state) => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={cloudsRef}>
      {Array.from({ length: 8 }, (_, i) => (
        <mesh
          key={`cloud-${i}`}
          position={[
            Math.cos(i * 0.8) * 40,
            15 + Math.sin(i) * 5,
            Math.sin(i * 0.8) * 40
          ]}
        >
          <sphereGeometry args={[3 + Math.random() * 2, 8, 8]} />
          <meshStandardMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.6}
            roughness={0.9}
          />
        </mesh>
      ))}
    </group>
  );
};
