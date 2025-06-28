
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Text } from '@react-three/drei';
import { Suspense } from 'react';
import { Building } from '@/components/Building';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { BuildingInfo } from '@/components/BuildingInfo';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Architectural Showcase
            </h1>
            <p className="text-gray-300">Interactive 3D Building Visualization</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Click and drag to rotate</p>
            <p className="text-sm text-gray-400">Scroll to zoom</p>
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="h-screen w-full">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[10, 8, 10]} />
          
          {/* Lighting Setup */}
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[10, 20, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />
          
          {/* Environment */}
          <Environment preset="city" />
          
          {/* Controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={50}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
            target={[0, 5, 0]}
          />
          
          {/* 3D Building */}
          <Suspense fallback={<LoadingSpinner />}>
            <Building />
          </Suspense>
          
          {/* Ground */}
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        </Canvas>
      </div>

      {/* Building Information Panel */}
      <BuildingInfo />
    </div>
  );
};

export default Index;
