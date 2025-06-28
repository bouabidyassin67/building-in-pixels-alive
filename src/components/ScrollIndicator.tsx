
import { Mouse, ArrowDown } from 'lucide-react';

export const ScrollIndicator = () => {
  return (
    <div className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-40 animate-bounce">
      <div className="flex flex-col items-center space-y-3 text-white/80">
        <div className="relative">
          <Mouse className="h-8 w-8" />
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-white/60 rounded-full animate-pulse" />
        </div>
        <ArrowDown className="h-5 w-5 animate-pulse" />
        <p className="text-sm font-medium tracking-wide">Scroll to Explore</p>
      </div>
    </div>
  );
};
