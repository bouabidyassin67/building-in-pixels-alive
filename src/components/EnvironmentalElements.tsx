
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

export const EnvironmentalElements = () => {
  const birdsRef = useRef<Group>(null);
  const leavesRef = useRef<Group>(null);

  useFrame((state) => {
    if (birdsRef.current) {
      birdsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    if (leavesRef.current) {
      leavesRef.current.children.forEach((leaf, i) => {
        leaf.position.y = Math.sin(state.clock.elapsedTime * 0.5 + i) * 2 + 10;
        leaf.rotation.x = state.clock.elapsedTime * 0.3 + i;
      });
    }
  });

  return (
    <>
      {/* Birds */}
      <group ref={birdsRef}>
        {Array.from({ length: 5 }, (_, i) => (
          <mesh
            key={`bird-${i}`}
            position={[
              Math.cos(i * 2) * 25,
              12 + Math.sin(i) * 3,
              Math.sin(i * 2) * 25
            ]}
          >
            <sphereGeometry args={[0.1, 4, 4]} />
            <meshStandardMaterial color="#2d3748" />
          </mesh>
        ))}
      </group>

      {/* Floating Leaves */}
      <group ref={leavesRef}>
        {Array.from({ length: 12 }, (_, i) => (
          <mesh
            key={`leaf-${i}`}
            position={[
              Math.random() * 40 - 20,
              8 + Math.random() * 15,
              Math.random() * 40 - 20
            ]}
          >
            <planeGeometry args={[0.3, 0.5]} />
            <meshStandardMaterial 
              color="#48bb78" 
              transparent 
              opacity={0.7}
              side={2}
            />
          </mesh>
        ))}
      </group>
    </>
  );
};
