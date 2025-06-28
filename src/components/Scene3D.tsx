
import { Environment } from '@react-three/drei';
import { TowerBuilding } from './TowerBuilding';
import { EnvironmentalElements } from './EnvironmentalElements';
import { Clouds } from './Clouds';

export const Scene3D = () => {
  return (
    <>
      {/* Lighting Setup */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 20, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
      <pointLight position={[-10, 10, -10]} intensity={0.3} color="#4f46e5" />
      
      {/* Environment */}
      <Environment preset="city" />
      
      {/* Fog for depth */}
      <fog attach="fog" args={['#1a1a2e', 30, 100]} />
      
      {/* Main Building */}
      <TowerBuilding />
      
      {/* Environmental Elements */}
      <EnvironmentalElements />
      
      {/* Clouds */}
      <Clouds />
      
      {/* Ground */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#0f0f23" roughness={0.8} />
      </mesh>
    </>
  );
};
