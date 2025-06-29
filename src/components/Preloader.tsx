import { useState, useEffect } from 'react';
import logo from '/public/logo.png';

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
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-white via-blue-200 to-blue-500 flex items-center justify-center">
      <div className="text-center">
        <img src={logo} alt="Chermiti Logo" className="h-20 w-auto mx-auto mb-8 object-contain bg-transparent animate-pulse border-none outline-none shadow-none" />
        <div className="mb-6">
          <span className="block text-xl md:text-2xl font-bold text-blue-800/80 tracking-wide animate-pulse drop-shadow-lg">
            Loading architectural experience<span className="animate-bounce inline-block">...</span>
          </span>
        </div>
        <div className="w-80 h-2 bg-blue-100 rounded-full overflow-hidden mx-auto">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-blue-300 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-blue-700 mt-4 font-semibold">{progress}%</p>
      </div>
    </div>
  );
};
