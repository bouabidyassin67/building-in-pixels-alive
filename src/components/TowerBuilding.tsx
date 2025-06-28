
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

export const TowerBuilding = () => {
  const buildingRef = useRef<Group>(null);

  useFrame((state) => {
    if (buildingRef.current) {
      // Subtle breathing animation
      buildingRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.005;
    }
  });

  return (
    <group ref={buildingRef}>
      {/* Base/Lobby Level */}
      <mesh castShadow receiveShadow position={[0, 1, 0]}>
        <boxGeometry args={[12, 3, 10]} />
        <meshStandardMaterial color="#2d3748" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Main Tower - Multiple Floors */}
      {Array.from({ length: 20 }, (_, floor) => (
        <group key={`floor-${floor}`} position={[0, 3 + floor * 1.2, 0]}>
          {/* Floor Structure */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[10 - floor * 0.1, 1.2, 8 - floor * 0.05]} />
            <meshStandardMaterial 
              color={floor > 15 ? "#4a5568" : "#2d3748"} 
              roughness={0.6} 
              metalness={0.4} 
            />
          </mesh>

          {/* Windows */}
          {Array.from({ length: 8 }, (_, windowIndex) => (
            <mesh 
              key={`window-${windowIndex}`}
              position={[
                -4 + (windowIndex % 4) * 2.5,
                0,
                windowIndex < 4 ? 4.1 : -4.1
              ]}
            >
              <boxGeometry args={[1.2, 0.8, 0.1]} />
              <meshStandardMaterial 
                color="#1a365d" 
                transparent 
                opacity={0.8}
                roughness={0.1}
                metalness={0.9}
                emissive="#0066cc"
                emissiveIntensity={0.1}
              />
            </mesh>
          ))}

          {/* Balconies for upper floors */}
          {floor > 10 && floor % 3 === 0 && (
            <mesh position={[0, -0.4, 4.5]} castShadow>
              <boxGeometry args={[8, 0.2, 1]} />
              <meshStandardMaterial color="#4a5568" roughness={0.8} />
            </mesh>
          )}
        </group>
      ))}

      {/* Penthouse */}
      <mesh castShadow receiveShadow position={[0, 27, 0]}>
        <boxGeometry args={[8, 3, 6]} />
        <meshStandardMaterial color="#4a5568" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* Rooftop Elements */}
      <mesh castShadow position={[0, 29, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 2]} />
        <meshStandardMaterial color="#718096" metalness={0.8} />
      </mesh>

      {/* Entrance Details */}
      <mesh position={[0, 0.8, 5.1]} castShadow>
        <boxGeometry args={[4, 2.5, 0.2]} />
        <meshStandardMaterial color="#1a202c" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Ground Level Landscaping */}
      {Array.from({ length: 6 }, (_, i) => (
        <mesh 
          key={`tree-${i}`}
          position={[
            15 + Math.cos(i) * 8,
            0.5,
            15 + Math.sin(i) * 8
          ]}
          castShadow
        >
          <cylinderGeometry args={[0.3, 0.5, 3]} />
          <meshStandardMaterial color="#2f855a" />
        </mesh>
      ))}
    </group>
  );
};
