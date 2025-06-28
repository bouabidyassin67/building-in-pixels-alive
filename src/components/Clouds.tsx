
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

export const Clouds = () => {
  const cloudsRef = useRef<Group>(null);
  const buildingCloudsRef = useRef<Group>(null);

  useFrame((state) => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
    if (buildingCloudsRef.current) {
      // Gentle floating motion for building-level clouds
      buildingCloudsRef.current.position.y = 16 + Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
      buildingCloudsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <>
      {/* High altitude clouds */}
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

      {/* Building-level clouds around 5th floor */}
      <group ref={buildingCloudsRef}>
        {/* Main cloud ring around the building */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 12 + Math.sin(i * 0.5) * 3;
          const height = 15 + Math.sin(i * 0.3) * 2;
          
          return (
            <mesh
              key={`building-cloud-${i}`}
              position={[
                Math.cos(angle) * radius,
                height,
                Math.sin(angle) * radius
              ]}
            >
              <sphereGeometry args={[2 + Math.random() * 1.5, 6, 6]} />
              <meshStandardMaterial 
                color="#f0f8ff" 
                transparent 
                opacity={0.4 + Math.random() * 0.2}
                roughness={1.0}
              />
            </mesh>
          );
        })}

        {/* Wispy clouds flowing around the building */}
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * Math.PI * 2 + Math.PI / 8;
          const radius = 8 + Math.sin(i) * 2;
          
          return (
            <mesh
              key={`wispy-cloud-${i}`}
              position={[
                Math.cos(angle) * radius,
                16 + Math.sin(i * 0.7) * 1.5,
                Math.sin(angle) * radius
              ]}
              rotation={[0, angle, Math.sin(i) * 0.2]}
            >
              <boxGeometry args={[4, 1, 0.5]} />
              <meshStandardMaterial 
                color="#ffffff" 
                transparent 
                opacity={0.3}
                roughness={1.0}
              />
            </mesh>
          );
        })}

        {/* Dense cloud base beneath the penthouse */}
        <mesh position={[0, 14, 0]}>
          <cylinderGeometry args={[10, 12, 2, 16]} />
          <meshStandardMaterial 
            color="#e6f3ff" 
            transparent 
            opacity={0.25}
            roughness={1.0}
          />
        </mesh>

        {/* Mystical fog particles */}
        {Array.from({ length: 20 }, (_, i) => (
          <mesh
            key={`fog-${i}`}
            position={[
              (Math.random() - 0.5) * 20,
              13 + Math.random() * 6,
              (Math.random() - 0.5) * 20
            ]}
          >
            <sphereGeometry args={[0.5 + Math.random() * 0.5, 4, 4]} />
            <meshStandardMaterial 
              color="#f8fafc" 
              transparent 
              opacity={0.15 + Math.random() * 0.1}
              roughness={1.0}
            />
          </mesh>
        ))}
      </group>
    </>
  );
};
