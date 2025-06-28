
import { Html, useProgress } from '@react-three/drei';

export const LoadingSpinner = () => {
  const { progress } = useProgress();
  
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
        <div className="text-lg font-semibold">Loading Building...</div>
        <div className="text-sm text-gray-300 mt-2">{Math.round(progress)}% complete</div>
      </div>
    </Html>
  );
};
