
import { useState, useEffect } from 'react';
import { Building2, Eye, Home, Crown, Sparkles, Phone, ArrowUp } from 'lucide-react';

export const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    { id: 'hero', label: 'Home', icon: Building2 },
    { id: 'entrance-view', label: 'Entrance', icon: Eye },
    { id: 'residential-floors', label: 'Residences', icon: Home },
    { id: 'upper-residences', label: 'Sky Homes', icon: Home },
    { id: 'penthouse-clouds', label: 'Penthouse', icon: Crown },
    { id: 'rooftop-garden', label: 'Amenities', icon: Sparkles },
    { id: 'contact', label: 'Contact', icon: Phone }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1) * 100;
      setScrollProgress(progress);

      // Determine active section
      const sectionElements = sections.map(section => 
        document.getElementById(section.id)
      ).filter(Boolean);

      const currentSection = sectionElements.findIndex(element => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
      });

      if (currentSection !== -1) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Progress bar */}
      <div className="fixed bottom-6 left-6 right-6 z-50 mx-auto max-w-4xl">
        <div className="bg-black/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl border border-gray-800 dark:border-gray-700 shadow-2xl">
          <div className="relative h-1 bg-gray-800 dark:bg-gray-700 rounded-t-2xl overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-300"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
          
          {/* Section indicators */}
          <div className="flex justify-center items-center py-4 px-6">
            <div className="flex space-x-2 overflow-x-auto max-w-full scrollbar-hide">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex flex-col items-center space-y-1 p-3 rounded-xl transition-all duration-200 min-w-[70px] ${
                      activeSection === index
                        ? 'bg-blue-600 dark:bg-blue-700 text-white scale-105 shadow-lg'
                        : 'text-gray-400 dark:text-gray-500 hover:text-blue-400 dark:hover:text-blue-300 hover:bg-gray-800 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-xs whitespace-nowrap font-medium">{section.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-32 right-6 z-50 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 backdrop-blur-sm"
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </>
  );
};
