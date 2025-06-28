
import { useState, useEffect } from 'react';
import { Building2 } from 'lucide-react';

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-blue-900 to-black flex items-center justify-center">
      <div className="text-center">
        <Building2 className="h-20 w-20 text-blue-400 mx-auto mb-8 animate-pulse" />
        <h1 className="text-4xl font-bold text-white mb-4">Skyline Tower</h1>
        <p className="text-blue-300 mb-8">Loading architectural experience...</p>
        
        <div className="w-80 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-blue-300 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-gray-400 mt-4">{progress}%</p>
      </div>
    </div>
  );
};
