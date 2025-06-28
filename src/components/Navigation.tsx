
import { useState, useEffect } from 'react';
import { Building2, Menu, X } from 'lucide-react';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-white" />
            <span className="text-white font-bold text-xl">SkylineArch</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#entrance" className="text-white hover:text-blue-400 transition-colors">Entrance</a>
            <a href="#amenities" className="text-white hover:text-blue-400 transition-colors">Amenities</a>
            <a href="#residences" className="text-white hover:text-blue-400 transition-colors">Residences</a>
            <a href="#penthouse" className="text-white hover:text-blue-400 transition-colors">Penthouse</a>
            <a href="#contact" className="text-white hover:text-blue-400 transition-colors">Contact</a>
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <a href="#entrance" className="block text-white hover:text-blue-400 transition-colors">Entrance</a>
            <a href="#amenities" className="block text-white hover:text-blue-400 transition-colors">Amenities</a>
            <a href="#residences" className="block text-white hover:text-blue-400 transition-colors">Residences</a>
            <a href="#penthouse" className="block text-white hover:text-blue-400 transition-colors">Penthouse</a>
            <a href="#contact" className="block text-white hover:text-blue-400 transition-colors">Contact</a>
          </div>
        )}
      </div>
    </nav>
  );
};
