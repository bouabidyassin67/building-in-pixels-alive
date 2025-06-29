
import { useRef, useMemo, Suspense } from 'react';
import { Environment, Stars } from '@react-three/drei';
import { Clouds } from './Clouds';
import { TowerBuilding } from './TowerBuilding';
import { useTheme } from '@/contexts/ThemeContext';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BuildingGLB } from './BuildingGLB';

// Custom Sky Gradient Material
function SkyGradient({ top = '#5bb6f7', bottom = '#2986cc' }) {
  const mesh = useRef();
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: new THREE.Color(top) },
        bottomColor: { value: new THREE.Color(bottom) },
      },
      vertexShader: `varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `uniform vec3 topColor;
        uniform vec3 bottomColor;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition).y * 0.5 + 0.5;
          gl_FragColor = vec4(mix(bottomColor, topColor, h), 1.0);
        }`,
      side: THREE.BackSide,
      depthWrite: false,
    });
  }, [top, bottom]);
  return (
    <mesh ref={mesh} scale={[300, 300, 300]}>
      <sphereGeometry args={[1, 32, 32]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

// Animated Stars
function AnimatedStars(props) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.children.forEach((star: any, i: number) => {
        const phase = i * 0.3;
        const t = state.clock.getElapsedTime() * 2 + phase;
        if (star.material && 'opacity' in star.material) {
          star.material.opacity = 0.5 + 0.5 * Math.sin(t + Math.sin(i));
        }
      });
    }
  });
  return (
    <group ref={group}>
      <Stars {...props} fade factor={1.2} saturation={0.7} speed={1.2} count={300} />
    </group>
  );
}

// Building Component with Better Error Handling
function BuildingWithFallback() {
  return (
    <Suspense fallback={<TowerBuilding />}>
      <BuildingGLB />
    </Suspense>
  );
}

export const Scene3D = () => {
  const { theme } = useTheme();

  return (
    <>
      {/* Lighting Setup */}
      <ambientLight intensity={theme === 'dark' ? 0.15 : 0.4} />
      <directionalLight
        position={[10, 20, 5]}
        intensity={theme === 'dark' ? 0.5 : 1.2}
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

      {/* Realistic Sky: Day/Night Mode */}
      {theme === 'dark' ? (
        <>
          <SkyGradient top="#1a237e" bottom="#0a1026" />
          <AnimatedStars radius={120} depth={60} />
        </>
      ) : (
        <>
          <SkyGradient top="#eaf6ff" bottom="#2986cc" />
        </>
      )}

      <Environment preset="city" background={false} />
      <fog attach="fog" args={[theme === 'dark' ? '#0a1026' : '#eaf6ff', 30, 100]} />

      {/* Main Building with improved error handling */}
      <BuildingWithFallback />

      <Clouds />

      {/* Ground */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[300, 300, 64, 64]} />
        <meshStandardMaterial
          color="#7ec850"
          roughness={0.85}
          metalness={0.1}
          vertexColors={false}
        />
      </mesh>
    </>
  );
};
