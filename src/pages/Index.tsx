import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { ScrollController } from '@/components/ScrollController';
import { Scene3D } from '@/components/Scene3D';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ContentSections } from '@/components/ContentSections';
import { Navigation } from '@/components/Navigation';
import { Preloader } from '@/components/Preloader';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <div className="relative">
      {/* Fixed 3D Canvas */}
      <div className="fixed inset-0 z-0">
        <Canvas
          shadows
          camera={{ position: [0, 2, 15], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <Scene3D />
            <ScrollController />
          </Suspense>
        </Canvas>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Scrollable Content */}
      <div className="relative z-10">
        <ContentSections />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
