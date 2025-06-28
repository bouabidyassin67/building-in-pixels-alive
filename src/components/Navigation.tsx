import { useState, useEffect } from 'react';
import { Building2, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { ContactDialog } from '@/components/ContactDialog';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Building2 className="h-10 w-10 text-blue-400" />
            <div>
              <span className="text-white font-bold text-2xl">Skyline Tower</span>
              <p className="text-blue-300 text-xs">Luxury Redefined</p>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <button 
              onClick={() => smoothScroll('hero')}
              className="text-white hover:text-blue-400 transition-colors px-4 py-2 rounded-lg hover:bg-white/10"
            >
              Home
            </button>
            <button 
              onClick={() => smoothScroll('entrance-view')}
              className="text-white hover:text-blue-400 transition-colors px-4 py-2 rounded-lg hover:bg-white/10"
            >
              Entrance
            </button>
            <button 
              onClick={() => smoothScroll('residential-floors')}
              className="text-white hover:text-blue-400 transition-colors px-4 py-2 rounded-lg hover:bg-white/10"
            >
              Residences
            </button>
            <button 
              onClick={() => smoothScroll('penthouse-clouds')}
              className="text-white hover:text-blue-400 transition-colors px-4 py-2 rounded-lg hover:bg-white/10"
            >
              Penthouse
            </button>
            
            <button
              onClick={toggleTheme}
              className="text-white hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-white/10"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <ContactDialog>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Contact
              </button>
            </ContactDialog>
          </div>

          <button 
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-6 space-y-2 pb-4">
            <button 
              onClick={() => smoothScroll('hero')}
              className="block w-full text-left text-white hover:text-blue-400 transition-colors px-4 py-3 rounded-lg hover:bg-white/10"
            >
              Home
            </button>
            <button 
              onClick={() => smoothScroll('entrance-view')}
              className="block w-full text-left text-white hover:text-blue-400 transition-colors px-4 py-3 rounded-lg hover:bg-white/10"
            >
              Entrance
            </button>
            <button 
              onClick={() => smoothScroll('residential-floors')}
              className="block w-full text-left text-white hover:text-blue-400 transition-colors px-4 py-3 rounded-lg hover:bg-white/10"
            >
              Residences
            </button>
            <button 
              onClick={() => smoothScroll('penthouse-clouds')}
              className="block w-full text-left text-white hover:text-blue-400 transition-colors px-4 py-3 rounded-lg hover:bg-white/10"
            >
              Penthouse
            </button>
            <button 
              onClick={() => smoothScroll('contact')}
              className="block w-full text-left bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Contact
            </button>
            
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-white">Dark Mode</span>
              <button
                onClick={toggleTheme}
                className="text-white hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-white/10"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
            
            <ContactDialog>
              <button className="block w-full text-left bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Contact
              </button>
            </ContactDialog>
          </div>
        )}
      </div>
    </nav>
  );
};
