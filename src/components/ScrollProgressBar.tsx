
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
      {/* Progress bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-t border-gray-800">
        <div className="relative h-2 bg-gray-800">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
        
        {/* Section indicators */}
        <div className="flex justify-center items-center py-3 px-4">
          <div className="flex space-x-1 overflow-x-auto max-w-full">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 min-w-[60px] ${
                    activeSection === index
                      ? 'bg-blue-600 text-white scale-110'
                      : 'text-gray-400 hover:text-blue-400 hover:bg-gray-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs whitespace-nowrap">{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-24 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </>
  );
};
