
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
      {/* Main Tower Structure - Single solid building */}
      <mesh castShadow receiveShadow position={[0, 12, 0]}>
        <boxGeometry args={[10, 24, 8]} />
        <meshStandardMaterial color="#2d3748" roughness={0.6} metalness={0.4} />
      </mesh>

      {/* Building Top/Crown */}
      <mesh castShadow receiveShadow position={[0, 25, 0]}>
        <boxGeometry args={[8, 2, 6]} />
        <meshStandardMaterial color="#4a5568" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* Rooftop Structure */}
      <mesh castShadow position={[0, 27, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 2]} />
        <meshStandardMaterial color="#718096" metalness={0.8} />
      </mesh>

      {/* Windows Pattern - Front Face */}
      {Array.from({ length: 6 }, (_, row) => 
        Array.from({ length: 4 }, (_, col) => (
          <mesh 
            key={`window-front-${row}-${col}`}
            position={[
              -3 + col * 2,
              4 + row * 3.5,
              4.1
            ]}
          >
            <boxGeometry args={[1.2, 2.5, 0.1]} />
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
        ))
      )}

      {/* Windows Pattern - Back Face */}
      {Array.from({ length: 6 }, (_, row) => 
        Array.from({ length: 4 }, (_, col) => (
          <mesh 
            key={`window-back-${row}-${col}`}
            position={[
              -3 + col * 2,
              4 + row * 3.5,
              -4.1
            ]}
          >
            <boxGeometry args={[1.2, 2.5, 0.1]} />
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
        ))
      )}

      {/* Windows Pattern - Left Side */}
      {Array.from({ length: 6 }, (_, row) => 
        Array.from({ length: 3 }, (_, col) => (
          <mesh 
            key={`window-left-${row}-${col}`}
            position={[
              -5.1,
              4 + row * 3.5,
              -2 + col * 2
            ]}
          >
            <boxGeometry args={[0.1, 2.5, 1.2]} />
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
        ))
      )}

      {/* Windows Pattern - Right Side */}
      {Array.from({ length: 6 }, (_, row) => 
        Array.from({ length: 3 }, (_, col) => (
          <mesh 
            key={`window-right-${row}-${col}`}
            position={[
              5.1,
              4 + row * 3.5,
              -2 + col * 2
            ]}
          >
            <boxGeometry args={[0.1, 2.5, 1.2]} />
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
        ))
      )}

      {/* Base/Lobby Level */}
      <mesh castShadow receiveShadow position={[0, 1.5, 0]}>
        <boxGeometry args={[12, 3, 10]} />
        <meshStandardMaterial color="#1a202c" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Entrance */}
      <mesh position={[0, 1.5, 5.1]} castShadow>
        <boxGeometry args={[4, 2.5, 0.2]} />
        <meshStandardMaterial color="#0f0f23" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Ground Level Landscaping */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh 
          key={`tree-${i}`}
          position={[
            Math.cos(i * 0.8) * 15,
            1,
            Math.sin(i * 0.8) * 15
          ]}
          castShadow
        >
          <cylinderGeometry args={[0.3, 0.5, 4]} />
          <meshStandardMaterial color="#2f855a" />
        </mesh>
      ))}
    </group>
  );
};
