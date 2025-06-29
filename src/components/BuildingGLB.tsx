
import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { useGLTF } from '@react-three/drei';
import { Html } from '@react-three/drei';

export function BuildingGLB(props: any) {
  const group = useRef<Group>(null);
  const [loadingState, setLoadingState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [gltf, setGltf] = useState<any>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedGltf = await useGLTF.preload('/scifi.glb');
        setGltf(loadedGltf);
        setLoadingState('loaded');
      } catch (error) {
        console.error("Failed to load GLB model:", error);
        setLoadingState('error');
      }
    };

    loadModel();
  }, []);

  useFrame(() => {
    if (group.current && loadingState === 'loaded') {
      group.current.rotation.y += 0.001;
    }
  });

  if (loadingState === 'loading') {
    return (
      <Html center>
        <div style={{ color: 'white', fontSize: '16px' }}>
          Loading 3D model...
        </div>
      </Html>
    );
  }

  if (loadingState === 'error' || !gltf?.scene) {
    return (
      <Html center>
        <div style={{ color: 'red', fontSize: '16px' }}>
          3D model unavailable. Using fallback.
        </div>
      </Html>
    );
  }

  return (
    <group ref={group} {...props}>
      <primitive object={gltf.scene.clone()} />
    </group>
  );
}
